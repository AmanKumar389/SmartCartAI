package com.smartcart.backend.controller;

import com.smartcart.backend.entity.User;
import com.smartcart.backend.security.JwtUtil;
import com.smartcart.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/profile")
    public User getProfile(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid Token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        return userService.getProfile(email);
    }

    @PutMapping("/profile")
    public User updateProfile(@RequestBody User user,
                              HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid Token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        return userService.updateProfile(email, user);
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody Map<String, String> data,
                                 HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid Token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        userService.changePassword(
                email,
                data.get("currentPassword"),
                data.get("newPassword")
        );

        return "Password Changed Successfully";
    }
}