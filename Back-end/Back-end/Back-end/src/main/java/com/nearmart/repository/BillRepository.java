package com.nearmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nearmart.entity.Bill;

public interface BillRepository extends JpaRepository<Bill, Long>{

    Optional<Bill> findByOrderOrderId(Long orderId);

    List<Bill> findByUserUserId(Long userId);

    List<Bill> findByShopShopId(Long shopId);

}