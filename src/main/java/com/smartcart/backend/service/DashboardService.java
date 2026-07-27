package com.smartcart.backend.service;

import com.smartcart.backend.repository.OrderRepository;
import com.smartcart.backend.repository.ProductRepository;
import com.smartcart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getDashboardData() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalProducts", productRepository.count());
        data.put("totalOrders", orderRepository.count());
        data.put("totalUsers", userRepository.count());

        Double revenue = orderRepository.getTotalRevenue();

        if (revenue == null) {
            revenue = 0.0;
        }

        data.put("totalRevenue", revenue);

        return data;
    }
}