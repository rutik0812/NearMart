package com.nearmart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nearmart.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByPhone(String phone);

}