package com.smartcart.backend.service;

import com.smartcart.backend.entity.Product;
import com.smartcart.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Add Product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Product By Id
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Search Product By Name
    public List<Product> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // Get Products By Category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // Get Recommended Products
    public List<Product> getRecommendedProducts(String category) {
        if (category == null || category.isEmpty()) {
            return productRepository.findTop8ByOrderByIdDesc();
        }

        List<Product> products = productRepository.findTop8ByCategory(category);

        if (products.isEmpty()) {
            return productRepository.findTop8ByOrderByIdDesc();
        }

        return products;
    }

    // Update Product
    public Product updateProduct(Long id, Product updatedProduct) {

        Product product = productRepository.findById(id).orElse(null);

        if (product != null) {
            product.setName(updatedProduct.getName());
            product.setCategory(updatedProduct.getCategory());
            product.setPrice(updatedProduct.getPrice());
            product.setDescription(updatedProduct.getDescription());
            product.setImageUrl(updatedProduct.getImageUrl());

            return productRepository.save(product);
        }

        return null;
    }

    // Delete Product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}