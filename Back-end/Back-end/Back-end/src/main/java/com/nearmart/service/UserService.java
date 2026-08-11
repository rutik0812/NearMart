package com.nearmart.service;

import com.nearmart.dto.LoginRequest;
import com.nearmart.dto.LoginResponse;
import com.nearmart.dto.RegisterRequest;
import com.nearmart.dto.UserResponse;

public interface UserService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}