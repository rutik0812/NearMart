package com.nearmart.entity;

import jakarta.persistence.*;
import lombok.*;
import com.nearmart.enums.UserRole;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String deliveryAddress;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
}