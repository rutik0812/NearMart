package com.nearmart.service;

import java.util.List;

import com.nearmart.dto.BillResponse;

public interface BillService {

    // Get Bill By Bill Id
    BillResponse getBillById(Long billId);

    // Get Bill By Order Id
    BillResponse getBillByOrder(Long orderId);

    // Get Bills of Logged-in Customer
    List<BillResponse> getMyBills(String phone);

    // Get Bills By Shop
    List<BillResponse> getBillsByShop(Long shopId);

}