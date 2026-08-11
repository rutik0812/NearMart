package com.nearmart.dto;

import java.math.BigDecimal;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long productId;

    private String productName;

    private String category;

    private BigDecimal price;

    private Integer stockQuantity;

    private Boolean isAvailable;

    private Long shopId;

    private String shopName;
}