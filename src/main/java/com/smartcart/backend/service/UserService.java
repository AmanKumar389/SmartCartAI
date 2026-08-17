package com.smartcart.backend.service;

import com.smartcart.backend.entity.User;
import com.smartcart.backend.repository.UserRepository;
import com.smartcart.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User
    public User registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Mobile is compulsory
        if (user.getMobile() == null || user.getMobile().trim().isEmpty()) {
            throw new RuntimeException("Mobile Number is required");
        }

        // DOB is compulsory
        if (user.getDateOfBirth() == null) {
            throw new RuntimeException("Date of Birth is required");
        }

        // DOB cannot be a future date
        if (user.getDateOfBirth().isAfter(LocalDate.now())) {
            throw new RuntimeException("Date of Birth cannot be a future date");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // Login User
    public String loginUser(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    // Get User Profile
    public User getProfile(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update User Profile
    public User updateProfile(String email, User updatedUser) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setMobile(updatedUser.getMobile());
        user.setAddress(updatedUser.getAddress());

        if (updatedUser.getProfileImage() != null) {
            user.setProfileImage(updatedUser.getProfileImage());
        }

        return userRepository.save(user);
    }

    // Change Password
    public void changePassword(String email, String currentPassword, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current Password is Incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }
}