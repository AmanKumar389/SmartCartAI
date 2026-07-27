package com.smartcart.backend.service;

import com.smartcart.backend.entity.Order;
import com.smartcart.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Place Order
    public Order placeOrder(Order order) {

        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("Pending");
        }

        return orderRepository.save(order);
    }

    // Get All Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get Order By Id
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    // Update Order
    public Order updateOrder(Long id, Order updatedOrder) {

        Order order = orderRepository.findById(id).orElse(null);

        if (order != null) {
            order.setCustomerName(updatedOrder.getCustomerName());
            order.setProductName(updatedOrder.getProductName());
            order.setQuantity(updatedOrder.getQuantity());
            order.setTotalPrice(updatedOrder.getTotalPrice());
            order.setStatus(updatedOrder.getStatus());

            return orderRepository.save(order);
        }

        return null;
    }

    // Delete Order
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}