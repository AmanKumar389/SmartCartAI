package com.smartcart.backend.controller;

import com.smartcart.backend.entity.Review;
import com.smartcart.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    @GetMapping("/{productId}")
    public List<Review> getReviews(@PathVariable Long productId) {
        return reviewService.getReviewsByProductId(productId);
    }

    @GetMapping("/summary/{productId}")
    public Map<String, Object> getReviewSummary(@PathVariable Long productId) {

        Map<String, Object> response = new HashMap<>();

        response.put("averageRating",
                reviewService.getAverageRating(productId));

        response.put("reviewCount",
                reviewService.getReviewCount(productId));

        return response;
    }
}