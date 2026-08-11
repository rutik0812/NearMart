package com.nearmart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nearmart.dto.ShopRequest;
import com.nearmart.dto.ShopResponse;
import com.nearmart.service.ShopService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/shops")
@CrossOrigin(origins = "http://localhost:5173")
public class ShopController {

    @Autowired
    private ShopService shopService;

    // ==========================================
    // REGISTER SHOP
    // PUBLIC - NO LOGIN REQUIRED
    // ==========================================

    @PostMapping
    public ShopResponse addShop(
            @Valid @RequestBody ShopRequest request) {

        return shopService.addShop(request);
    }

    // ==========================================
    // GET ALL SHOPS
    // LOGIN REQUIRED
    // ==========================================

    @GetMapping
    public List<ShopResponse> getAllShops() {

        return shopService.getAllShops();
    }

    // ==========================================
    // GET SHOP BY ID
    // LOGIN REQUIRED
    // ==========================================

    @GetMapping("/get/{id}")
    public ShopResponse getShopById(
            @PathVariable Long id) {

        return shopService.getShopById(id);
    }

    // ==========================================
    // UPDATE SHOP
    // LOGIN REQUIRED
    // ==========================================

    @PutMapping("/{id}")
    public ShopResponse updateShop(
            @PathVariable Long id,
            @Valid @RequestBody ShopRequest request) {

        return shopService.updateShop(id, request);
    }

    // ==========================================
    // DELETE SHOP
    // LOGIN REQUIRED
    // ==========================================

    @DeleteMapping("/{id}")
    public String deleteShop(
            @PathVariable Long id) {

        shopService.deleteShop(id);

        return "Shop deleted successfully";
    }
}