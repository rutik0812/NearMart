package com.nearmart.dto;

import com.nearmart.enums.ShopStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShopResponse {

    private Long shopId;

    private String shopName;

    private String ownerName;

    private String shopAddress;

    private ShopStatus status;
}