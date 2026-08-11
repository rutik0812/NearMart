package com.nearmart.serviceimpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nearmart.dto.LoginRequest;
import com.nearmart.dto.LoginResponse;
import com.nearmart.dto.RegisterRequest;
import com.nearmart.dto.UserResponse;
import com.nearmart.entity.User;
import com.nearmart.enums.UserRole;
import com.nearmart.repository.UserRepository;
import com.nearmart.security.JwtService;
import com.nearmart.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public UserResponse register(RegisterRequest request) {

        Optional<User> existing = userRepository.findByPhone(request.getPhone());

        if (existing.isPresent()) {
            throw new RuntimeException("Phone Number Already Registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDeliveryAddress(request.getDeliveryAddress());
        user.setRole(UserRole.CUSTOMER);

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getUserId(),
                savedUser.getName(),
                savedUser.getPhone(),
                savedUser.getDeliveryAddress());
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getPhone());

        return new LoginResponse(
                token,
                user.getUserId(),
                user.getName(),
                user.getRole().name());
    }
}