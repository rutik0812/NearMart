package com.nearmart.serviceimpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nearmart.dto.ShopRequest;
import com.nearmart.dto.ShopResponse;
import com.nearmart.entity.Shop;
import com.nearmart.enums.ShopStatus;
import com.nearmart.repository.ShopRepository;
import com.nearmart.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepository;

    @Override
    public ShopResponse addShop(ShopRequest request) {

        Shop shop = new Shop();

        shop.setShopName(request.getShopName());
        shop.setOwnerName(request.getOwnerName());
        shop.setShopAddress(request.getShopAddress());
        shop.setStatus(ShopStatus.ACTIVE);

        Shop savedShop = shopRepository.save(shop);

        return mapToResponse(savedShop);
    }

    @Override
    public List<ShopResponse> getAllShops() {

        return shopRepository.findByStatus(ShopStatus.ACTIVE)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ShopResponse getShopById(Long shopId) {

        Shop shop = shopRepository
                .findByShopIdAndStatus(shopId, ShopStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        return mapToResponse(shop);
    }

    @Override
    public ShopResponse updateShop(Long shopId, ShopRequest request) {

        Shop shop = shopRepository
                .findByShopIdAndStatus(shopId, ShopStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        shop.setShopName(request.getShopName());
        shop.setOwnerName(request.getOwnerName());
        shop.setShopAddress(request.getShopAddress());

        Shop updatedShop = shopRepository.save(shop);

        return mapToResponse(updatedShop);
    }

    @Override
    public void deleteShop(Long shopId) {

        Shop shop = shopRepository
                .findByShopIdAndStatus(shopId, ShopStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        shop.setStatus(ShopStatus.INACTIVE);

        shopRepository.save(shop);
    }

    private ShopResponse mapToResponse(Shop shop) {

        return new ShopResponse(
                shop.getShopId(),
                shop.getShopName(),
                shop.getOwnerName(),
                shop.getShopAddress(),
                shop.getStatus()
        );
    }

}