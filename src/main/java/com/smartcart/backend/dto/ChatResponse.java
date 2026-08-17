package com.smartcart.backend.dto;

import com.smartcart.backend.entity.Product;

import java.util.List;

public class ChatResponse {

    private String reply;
    private List<Product> products;

    public ChatResponse() {
    }

    public ChatResponse(String reply, List<Product> products) {
        this.reply = reply;
        this.products = products;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}