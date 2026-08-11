package com.nearmart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nearmart.entity.Order;
import com.nearmart.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get all orders of a user
    List<Order> findByUserUserId(Long userId);

    // Get all orders of a shop
    List<Order> findByShopShopId(Long shopId);

    // Get orders by status
    List<Order> findByOrderStatus(OrderStatus orderStatus);

    // Get orders of a user by status
    List<Order> findByUserUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);

    // Get orders of a shop by status
    List<Order> findByShopShopIdAndOrderStatus(Long shopId, OrderStatus orderStatus);

}