package com.nearmart.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ShopRequest {

    @NotBlank(message = "Shop name is required")
    private String shopName;

    @NotBlank(message = "Owner name is required")
    private String ownerName;

    @NotBlank(message = "Shop address is required")
    private String shopAddress;
}