package com.smartcart.backend.controller;

import com.smartcart.backend.entity.Cart;
import com.smartcart.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add to Cart
    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    // Get All Cart Items
    @GetMapping
    public List<Cart> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    // Get Cart Item By Id
    @GetMapping("/{id}")
    public Cart getCartItemById(@PathVariable Long id) {
        return cartService.getCartItemById(id);
    }

    // Update Cart Item
    @PutMapping("/{id}")
    public Cart updateCartItem(@PathVariable Long id,
                               @RequestBody Cart cart) {
        return cartService.updateCartItem(id, cart);
    }

    // Delete Cart Item
    @DeleteMapping("/{id}")
    public String removeCartItem(@PathVariable Long id) {
        cartService.removeCartItem(id);
        return "Cart Item Deleted Successfully";
    }
}