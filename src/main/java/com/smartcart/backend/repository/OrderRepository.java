package com.smartcart.backend.repository;

import com.smartcart.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Double getTotalRevenue();

}