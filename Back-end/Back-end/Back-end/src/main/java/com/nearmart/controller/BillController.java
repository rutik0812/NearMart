package com.nearmart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.nearmart.dto.BillResponse;
import com.nearmart.service.BillService;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    /**
     * Get Bill By Bill Id
     * CUSTOMER, SHOP_OWNER and ADMIN
     */
    @PreAuthorize("hasAnyRole('CUSTOMER','SHOP_OWNER','ADMIN')")
    @GetMapping("/{billId}")
    public ResponseEntity<BillResponse> getBillById(
            @PathVariable Long billId) {

        return ResponseEntity.ok(
                billService.getBillById(billId));
    }

    /**
     * Get Bill By Order Id
     * CUSTOMER, SHOP_OWNER and ADMIN
     */
    @PreAuthorize("hasAnyRole('CUSTOMER','SHOP_OWNER','ADMIN')")
    @GetMapping("/order/{orderId}")
    public ResponseEntity<BillResponse> getBillByOrder(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(
                billService.getBillByOrder(orderId));
    }

    /**
     * Get Logged-in Customer Bills
     */
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my-bills")
    public ResponseEntity<List<BillResponse>> getMyBills(
            Authentication authentication) {

        String phone = authentication.getName();

        return ResponseEntity.ok(
                billService.getMyBills(phone));
    }

    /**
     * Get Bills By Shop
     */
    @PreAuthorize("hasRole('SHOP_OWNER')")
    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<BillResponse>> getBillsByShop(
            @PathVariable Long shopId) {

        return ResponseEntity.ok(
                billService.getBillsByShop(shopId));
    }

}