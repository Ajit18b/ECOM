package com.Ecom.demoEcommerceWeb.entity;

// Importing necessary annotations and Lombok's @Data
import lombok.Data;

import javax.persistence.*;

/**
 * Entity class representing a checkout in the e-commerce system.
 */
@Entity
@Table(name = "checkout")
@Data
public class Checkout {
    /**
     * No-argument constructor for Checkout entity.
     */
    public Checkout(){}

    /**
     * Constructor for Checkout entity with all fields.
     *
     * @param userEmail the user's email
     * @param checkoutDate the date of checkout
     * @param returnDate the date of return
     * @param productId the ID of the product being checked out
     */
    public Checkout(String userEmail,String checkoutDate,String returnDate,Long productId){
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.productId = productId;
    }

    /**
     * Unique identifier for the checkout.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    /**
     * Email of the user who performed the checkout.
     */
    @Column(name="user_email")
    private String userEmail;

    /**
     * Date when the checkout was performed.
     */
    @Column(name = "checkout_date")
    private  String checkoutDate;

    /**
     * Date when the product is expected to be returned.
     */
    @Column(name = "return_date")
    private String returnDate;

    /**
     * ID of the product being checked out.
     */
    @Column(name="product_id")
    private Long productId;
}