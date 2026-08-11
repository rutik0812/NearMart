package com.nearmart.service;

import java.util.List;

import com.nearmart.dto.ShopRequest;
import com.nearmart.dto.ShopResponse;

public interface ShopService {

    ShopResponse addShop(ShopRequest request);

    List<ShopResponse> getAllShops();

    ShopResponse getShopById(Long shopId);

    ShopResponse updateShop(Long shopId, ShopRequest request);

    void deleteShop(Long shopId);

}