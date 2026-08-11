package com.nearmart.service;

import java.util.List;

import com.nearmart.dto.ProductRequest;
import com.nearmart.dto.ProductResponse;

public interface ProductService {

    ProductResponse addProduct(ProductRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long productId);

    List<ProductResponse> getProductsByShop(Long shopId);

    List<ProductResponse> searchProducts(String name);

    ProductResponse updateProduct(Long productId, ProductRequest request);

    void deleteProduct(Long productId);

}