package com.sport.demo.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sport.demo.dto.CreatePaymentRequest;
import com.sport.demo.dto.PaymentOrderResponse;
import com.sport.demo.dto.VerifyPaymentRequest;
import com.sport.demo.entity.Payment;
import com.sport.demo.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;


    // Create Razorpay order
    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponse>
            createOrder(
                    @Valid
                    @RequestBody
                    CreatePaymentRequest request)
            throws Exception {

        PaymentOrderResponse response =
                paymentService.createOrder(request);

        return ResponseEntity.ok(response);
    }


    // Verify Razorpay payment
    @PostMapping("/verify")
    public ResponseEntity<Payment>
            verifyPayment(
                    @Valid
                    @RequestBody
                    VerifyPaymentRequest request)
            throws Exception {

        Payment payment =
                paymentService.verifyPayment(request);

        return ResponseEntity.ok(payment);
    }


    // Get payment
    @GetMapping("/{id}")
    public ResponseEntity<Payment>
            getPayment(@PathVariable Long id) {

        return ResponseEntity.ok(
                paymentService.getPayment(id)
        );
    }
}