package com.sport.demo.dto;

import java.math.BigDecimal;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentOrderResponse {

    private Long paymentId;

    private String razorpayOrderId;

    private String key;

    private BigDecimal amount;

    private String currency;

    private String status;
}