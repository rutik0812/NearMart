package com.nearmart.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.nearmart.enums.OrderStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<OrderItem> orderItems;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        if(orderStatus == null){
            orderStatus = OrderStatus.PENDING;
        }

        if(totalPrice == null){
            totalPrice = BigDecimal.ZERO;
        }
    }

}