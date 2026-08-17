package com.smartcart.backend.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private RazorpayClient razorpayClient;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount) throws Exception {

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());

        Order order = razorpayClient.orders.create(orderRequest);

        return order.toString();
    }
}
