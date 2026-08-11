package com.nearmart.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.nearmart.enums.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

    private Long orderId;

    private Long userId;

    private String userName;

    private Long shopId;

    private String shopName;

    private BigDecimal totalPrice;

    private OrderStatus orderStatus;

    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;

}