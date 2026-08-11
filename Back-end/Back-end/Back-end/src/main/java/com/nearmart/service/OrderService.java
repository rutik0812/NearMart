package com.nearmart.service;

import java.util.List;

import com.nearmart.dto.OrderRequest;
import com.nearmart.dto.OrderResponse;
import com.nearmart.enums.OrderStatus;

public interface OrderService {

    // Place Order (Logged-in Customer)
    OrderResponse placeOrder(OrderRequest request, String phone);

    // Get Order By Id
    OrderResponse getOrderById(Long orderId);

    // Get Logged-in Customer Orders
    List<OrderResponse> getMyOrders(String phone);

    // Get Orders By Shop
    List<OrderResponse> getOrdersByShop(Long shopId);

    // Get Orders By Status
    List<OrderResponse> getOrdersByStatus(OrderStatus status);

    // Update Order Status
    OrderResponse updateOrderStatus(Long orderId, OrderStatus status);

}