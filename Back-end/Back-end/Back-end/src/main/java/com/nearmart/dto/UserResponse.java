package com.nearmart.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long userId;

    private String name;

    private String phone;

    private String deliveryAddress;

}