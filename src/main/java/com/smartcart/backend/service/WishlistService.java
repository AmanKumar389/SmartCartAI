package com.smartcart.backend.service;

import com.smartcart.backend.entity.Wishlist;
import com.smartcart.backend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public List<Wishlist> getAllWishlist() {
        return wishlistRepository.findAll();
    }

    public Wishlist addToWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public void removeFromWishlist(Long id) {
        wishlistRepository.deleteById(id);
    }
}