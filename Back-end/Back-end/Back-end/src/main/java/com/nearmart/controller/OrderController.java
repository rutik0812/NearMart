package com.nearmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.nearmart.dto.OrderRequest;
import com.nearmart.dto.OrderResponse;
import com.nearmart.enums.OrderStatus;
import com.nearmart.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Place Order
     * Accessible only by CUSTOMER
     */
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @Valid @RequestBody OrderRequest request,
            Authentication authentication) {

        String phone = authentication.getName();

        OrderResponse response = orderService.placeOrder(request, phone);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get Order By Id
     * Accessible by CUSTOMER, SHOP_OWNER and ADMIN
     */
    @PreAuthorize("hasAnyRole('CUSTOMER','SHOP_OWNER','ADMIN')")
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    /**
     * Get Logged-in Customer Orders
     * JWT is used instead of userId
     */
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders(
            Authentication authentication) {

        String phone = authentication.getName();

        return ResponseEntity.ok(
                orderService.getMyOrders(phone));
    }

    /**
     * Get Orders of a Shop
     * Accessible only by SHOP_OWNER
     */
    @PreAuthorize("hasRole('SHOP_OWNER')")
    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByShop(
            @PathVariable Long shopId) {

        return ResponseEntity.ok(
                orderService.getOrdersByShop(shopId));
    }

    /**
     * Get Orders By Status
     * Accessible by SHOP_OWNER and ADMIN
     */
    @PreAuthorize("hasAnyRole('SHOP_OWNER','ADMIN')")
    @GetMapping("/status/{status}")
    
    public ResponseEntity<List<OrderResponse>> getOrdersByStatus(
            @PathVariable OrderStatus status) {

        return ResponseEntity.ok(
                orderService.getOrdersByStatus(status));
    }

    /**
     * Update Order Status
     * Accessible only by SHOP_OWNER
     */
    @PreAuthorize("hasRole('SHOP_OWNER')")
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(orderId, status));
    }
}