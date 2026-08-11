package com.nearmart.serviceimpl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nearmart.dto.BillItemResponse;
import com.nearmart.dto.BillResponse;
import com.nearmart.entity.Bill;
import com.nearmart.entity.OrderItem;
import com.nearmart.entity.User;
import com.nearmart.exception.ResourceNotFoundException;
import com.nearmart.repository.BillRepository;
import com.nearmart.repository.UserRepository;
import com.nearmart.service.BillService;

@Service
@Transactional(readOnly = true)
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final UserRepository userRepository;

    public BillServiceImpl(BillRepository billRepository,
                           UserRepository userRepository) {

        this.billRepository = billRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BillResponse getBillById(Long billId) {

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found"));

        return mapToResponse(bill);
    }

    @Override
    public BillResponse getBillByOrder(Long orderId) {

        Bill bill = billRepository.findByOrderOrderId(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found"));

        return mapToResponse(bill);
    }

    @Override
    public List<BillResponse> getMyBills(String phone) {

        User user = userRepository.findByPhone(phone)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return billRepository.findByUserUserId(user.getUserId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<BillResponse> getBillsByShop(Long shopId) {

        return billRepository.findByShopShopId(shopId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private BillResponse mapToResponse(Bill bill) {

        List<BillItemResponse> items = bill.getOrder()
                .getOrderItems()
                .stream()
                .map(this::mapItemResponse)
                .toList();

        return new BillResponse(

                bill.getBillId(),

                bill.getOrder().getOrderId(),

                bill.getUser().getName(),

                bill.getShop().getShopName(),

                bill.getTotalPrice(),

                bill.getCreatedAt(),

                items
        );
    }

    private BillItemResponse mapItemResponse(OrderItem item) {

        BigDecimal subTotal = item.getPrice()
                .multiply(BigDecimal.valueOf(item.getQuantity()));

        return new BillItemResponse(

                item.getProduct().getProductName(),

                item.getQuantity(),

                item.getPrice(),

                subTotal
        );
    }
}