package com.sport.demo.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.sport.demo.dto.CreatePaymentRequest;
import com.sport.demo.dto.PaymentOrderResponse;
import com.sport.demo.dto.VerifyPaymentRequest;
import com.sport.demo.entity.Payment;
import com.sport.demo.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;


    // =========================
    // CREATE RAZORPAY ORDER
    // =========================

    public PaymentOrderResponse createOrder(
            CreatePaymentRequest request) throws Exception {

        RazorpayClient razorpayClient =
                new RazorpayClient(
                        razorpayKeyId,
                        razorpayKeySecret
                );

        /*
         * Razorpay requires amount in paise.
         *
         * ₹500 -> 50000 paise
         */
        int amountInPaise =
                request.getAmount()
                       .multiply(BigDecimal.valueOf(100))
                       .intValueExact();

        JSONObject orderRequest =
                new JSONObject();

        orderRequest.put(
                "amount",
                amountInPaise
        );

        orderRequest.put(
                "currency",
                "INR"
        );

        orderRequest.put(
                "receipt",
                "nearmart_order_" + request.getOrderId()
        );


        // Send request to Razorpay
        Order razorpayOrder =
                razorpayClient.orders.create(
                        orderRequest
                );


        // Razorpay-generated order ID
        String razorpayOrderId =
                razorpayOrder.get("id");


        // Save payment in our database
        Payment payment =
                Payment.builder()
                        .orderId(request.getOrderId())
                        .userId(request.getUserId())
                        .amount(request.getAmount())
                        .currency("INR")
                        .razorpayOrderId(
                                razorpayOrderId
                        )
                        .status("CREATED")
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .build();


        Payment savedPayment =
                paymentRepository.save(payment);


        return PaymentOrderResponse.builder()
                .paymentId(savedPayment.getId())
                .razorpayOrderId(
                        savedPayment.getRazorpayOrderId()
                )
                .key(razorpayKeyId)
                .amount(savedPayment.getAmount())
                .currency(savedPayment.getCurrency())
                .status(savedPayment.getStatus())
                .build();
    }


    // =========================
    // VERIFY PAYMENT
    // =========================

    public Payment verifyPayment(
            VerifyPaymentRequest request)
            throws Exception {

        Payment payment =
                paymentRepository
                        .findByRazorpayOrderId(
                                request.getRazorpayOrderId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Payment order not found"
                                )
                        );


        JSONObject attributes =
                new JSONObject();

        attributes.put(
                "razorpay_order_id",
                request.getRazorpayOrderId()
        );

        attributes.put(
                "razorpay_payment_id",
                request.getRazorpayPaymentId()
        );

        attributes.put(
                "razorpay_signature",
                request.getRazorpaySignature()
        );


        boolean signatureValid =
                Utils.verifyPaymentSignature(
                        attributes,
                        razorpayKeySecret
                );


        if (!signatureValid) {

            payment.setStatus("FAILED");

            paymentRepository.save(payment);

            throw new RuntimeException(
                    "Invalid Razorpay payment signature"
            );
        }


        payment.setRazorpayPaymentId(
                request.getRazorpayPaymentId()
        );

        payment.setStatus("SUCCESS");

        payment.setPaidAt(
                LocalDateTime.now()
        );


        return paymentRepository.save(payment);
    }


    // =========================
    // GET PAYMENT
    // =========================

    public Payment getPayment(Long id) {

        return paymentRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Payment not found with id: "
                                        + id
                        )
                );
    }
}