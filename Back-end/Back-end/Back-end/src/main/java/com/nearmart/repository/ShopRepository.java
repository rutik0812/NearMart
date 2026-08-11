package com.nearmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nearmart.entity.Shop;
import com.nearmart.enums.ShopStatus;

public interface ShopRepository extends JpaRepository<Shop, Long> {

    List<Shop> findByStatus(ShopStatus status);

    Optional<Shop> findByShopIdAndStatus(Long shopId, ShopStatus status);

}