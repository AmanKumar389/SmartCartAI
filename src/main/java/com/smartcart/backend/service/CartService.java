package com.smartcart.backend.service;

import com.smartcart.backend.entity.Cart;
import com.smartcart.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add to Cart
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Get All Cart Items
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    // Get Cart Item By Id
    public Cart getCartItemById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    // Update Cart Item
    public Cart updateCartItem(Long id, Cart updatedCart) {
        Cart cart = cartRepository.findById(id).orElse(null);

        if (cart != null) {
            cart.setProductId(updatedCart.getProductId());
            cart.setProductName(updatedCart.getProductName());
            cart.setPrice(updatedCart.getPrice());
            cart.setQuantity(updatedCart.getQuantity());

            return cartRepository.save(cart);
        }

        return null;
    }

    // Remove Cart Item
    public void removeCartItem(Long id) {
        cartRepository.deleteById(id);
    }
}
