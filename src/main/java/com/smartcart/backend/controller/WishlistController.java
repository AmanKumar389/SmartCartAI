package com.smartcart.backend.controller;

import com.smartcart.backend.entity.Wishlist;
import com.smartcart.backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public List<Wishlist> getWishlist() {
        return wishlistService.getAllWishlist();
    }

    @PostMapping
    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {
        return wishlistService.addToWishlist(wishlist);
    }

    @DeleteMapping("/{id}")
    public void removeFromWishlist(@PathVariable Long id) {
        wishlistService.removeFromWishlist(id);
    }
}
