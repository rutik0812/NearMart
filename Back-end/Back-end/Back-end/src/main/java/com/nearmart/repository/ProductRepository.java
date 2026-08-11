package com.nearmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nearmart.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByIsAvailableTrue();

    List<Product> findByShopShopId(Long shopId);

    List<Product> findByProductNameContainingIgnoreCase(String productName);
    
    Optional<Product> findByProductNameAndShopShopId(
            String productName,
            Long shopId
    );
}