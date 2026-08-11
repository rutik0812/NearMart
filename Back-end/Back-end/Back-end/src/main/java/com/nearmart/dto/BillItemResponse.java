package com.nearmart.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillItemResponse {

    private String productName;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal subTotal;

}