package com.smartcart.backend.repository;

import com.smartcart.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Search products by name
    List<Product> findByNameContainingIgnoreCase(String name);

    // Filter by category
    List<Product> findByCategory(String category);

    // Search by category (ignore case)
    List<Product> findByCategoryContainingIgnoreCase(String category);

    // Get top 8 products of a category
    List<Product> findTop8ByCategory(String category);

    // Latest 8 products
    List<Product> findTop8ByOrderByIdDesc();
}