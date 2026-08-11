package com.nearmart.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillResponse {

    private Long billId;

    private Long orderId;

    private String customerName;

    private String shopName;

    private BigDecimal totalPrice;

    private LocalDateTime createdAt;

    private List<BillItemResponse> items;

}