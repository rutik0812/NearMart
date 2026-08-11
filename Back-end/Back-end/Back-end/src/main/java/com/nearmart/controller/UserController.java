package com.nearmart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.nearmart.dto.LoginResponse;
import org.springframework.web.bind.annotation.*;

import com.nearmart.dto.LoginRequest;
import com.nearmart.dto.RegisterRequest;
import com.nearmart.dto.UserResponse;
import com.nearmart.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request){

        return userService.register(request);

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(userService.login(request));
    }

}