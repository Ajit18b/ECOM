package com.Ecom.demoEcommerceWeb.dao;

// Importing necessary entities and Spring Data JPA annotations
import com.Ecom.demoEcommerceWeb.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repository interface for Checkout entity.
 */
public interface CheckoutRepository extends JpaRepository<Checkout,Long> {
    /**
     * Method to find a Checkout entity by user email and product ID.
     *
     * @param userEmail the user's email
     * @param productId the product ID
     * @return the Checkout entity if found, null otherwise
     */
    Checkout findByUserEmailAndProductId(String userEmail, Long productId);

    /**
     * Method to find all Checkout entities for a given user email.
     *
     * @param userEmail the user's email
     * @return a list of Checkout entities for the user
     */
    List<Checkout> findProductsByUserEmail(String userEmail);

    /**
     * Method to delete all Checkout entities for a given product ID.
     *
     * @param productId the product ID
     */
    @Modifying // indicates that this method will modify the database
    @Query("delete from Checkout where product_id in :product_id")
    void deleteAllByProductId(@Param("product_id") Long productId);
}