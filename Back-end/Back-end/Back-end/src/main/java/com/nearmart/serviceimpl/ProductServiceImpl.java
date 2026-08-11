package com.nearmart.serviceimpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nearmart.dto.ProductRequest;
import com.nearmart.dto.ProductResponse;
import com.nearmart.entity.Product;
import com.nearmart.entity.Shop;
import com.nearmart.exception.DuplicateResourceException;
import com.nearmart.exception.ResourceNotFoundException;
import com.nearmart.repository.ProductRepository;
import com.nearmart.repository.ShopRepository;
import com.nearmart.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ShopRepository shopRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              ShopRepository shopRepository) {

        this.productRepository = productRepository;
        this.shopRepository = shopRepository;
    }

   
    @Override
    public ProductResponse addProduct(ProductRequest request) {

        // Check shop exists
        Shop shop = shopRepository.findById(request.getShopId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Shop not found"));

        // Check shop is active
        if (Boolean.FALSE.equals(shop.getStatus())) {
            throw new ResourceNotFoundException("Shop is inactive");
        }

        // Check if product already exists in this shop
        Optional<Product> existingProduct =
                productRepository.findByProductNameAndShopShopId(
                        request.getProductName(),
                        request.getShopId());

        if (existingProduct.isPresent()) {

            Product product = existingProduct.get();

            // Product was soft deleted -> Reactivate it
            if (Boolean.FALSE.equals(product.getIsAvailable())) {

                product.setIsAvailable(true);
                product.setCategory(request.getCategory());
                product.setPrice(request.getPrice());
                product.setStockQuantity(request.getStockQuantity());

                Product updatedProduct = productRepository.save(product);

                return mapToResponse(updatedProduct);
            }

            // Product is already active
            throw new DuplicateResourceException(
                    "Product already exists in this shop");
        }

        // Create new product
        Product product = new Product();

        product.setProductName(request.getProductName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setIsAvailable(true);
        product.setShop(shop);

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }
    @Override
    public List<ProductResponse> getAllProducts() {

        return productRepository.findByIsAvailableTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse getProductById(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        if(Boolean.FALSE.equals(product.getIsAvailable())){
            throw new ResourceNotFoundException("Product not found");
        }

        return mapToResponse(product);
    }

    @Override
    public List<ProductResponse> getProductsByShop(Long shopId) {

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Shop not found"));

        if(Boolean.FALSE.equals(shop.getStatus())){
            throw new ResourceNotFoundException("Shop not found");
        }

        return productRepository.findByShopShopId(shopId)
                .stream()
                .filter(Product::getIsAvailable)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> searchProducts(String name) {

        return productRepository
                .findByProductNameContainingIgnoreCase(name)
                .stream()
                .filter(Product::getIsAvailable)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse updateProduct(Long productId,
                                         ProductRequest request) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        product.setProductName(request.getProductName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());

        return mapToResponse(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        product.setIsAvailable(false);

        productRepository.save(product);
    }

    private ProductResponse mapToResponse(Product product){

        return new ProductResponse(

                product.getProductId(),
                product.getProductName(),
                product.getCategory(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getIsAvailable(),
                product.getShop().getShopId(),
                product.getShop().getShopName()

        );
    }

}