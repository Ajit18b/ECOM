package com.Ecom.demoEcommerceWeb.entity;

// Importing necessary annotations and Lombok's @Data
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.*;

/**
 * Entity class representing a review in the e-commerce system.
 */
@Entity
@Table
@Data
public class Review {

    /**
     * No-argument constructor for Review entity.
     */
    public Review(){}

    /**
     * Unique identifier for the review.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * Email of the user who wrote the review.
     */
    @Column(name = "user_email")
    private String userEmail;

    /**
     * Date and time when the review was written.
     * Automatically set by Hibernate when the review is created.
     */
    @Column(name = "date")
    @CreationTimestamp
    private Date date;

    /**
     * Rating given by the user (e.g. 1-5 stars).
     */
    @Column(name="rating")
    private double rating;

    /**
     * ID of the product being reviewed.
     */
    @Column(name= "product_id")
    private Long productId;

    /**
     * Text description of the review.
     */
    @Column(name= "review_description")
    private String reviewDescription;
}