package com.nearmart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nearmart.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Get all items of an order
    List<OrderItem> findByOrderOrderId(Long orderId);

    // Get all orders containing a product
    List<OrderItem> findByProductProductId(Long productId);

}