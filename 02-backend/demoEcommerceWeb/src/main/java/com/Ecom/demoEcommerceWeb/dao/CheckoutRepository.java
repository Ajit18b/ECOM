package com.Ecom.demoEcommerceWeb.dao;

import com.Ecom.demoEcommerceWeb.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {
    Checkout findByUserEmailAndProductId(String userEmail, Long productId);
    List<Checkout> findProductsByUserEmail(String userEmail);
    @Modifying
    @Query("delete from Checkout where product_id in :product_id")
    void deleteAllByProductId(@Param("product_id") Long productId);
}
