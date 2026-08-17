package com.smartcart.backend.repository;

import com.smartcart.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductId(Long productId);

    long countByProductId(Long productId);

    @Query("SELECT COALESCE(AVG(r.rating),0) FROM Review r WHERE r.productId = :productId")
    Double findAverageRatingByProductId(@Param("productId") Long productId);

}