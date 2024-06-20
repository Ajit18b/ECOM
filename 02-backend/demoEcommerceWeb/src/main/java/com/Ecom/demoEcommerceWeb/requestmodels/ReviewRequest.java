package com.Ecom.demoEcommerceWeb.requestmodels;

// Importing Lombok's @Data
import lombok.Data;

// Importing Java's Optional class for handling null values
import java.util.Optional;

/**
 * Data transfer object for review request.
 */
@Data
public class ReviewRequest {

    /**
     * Rating given by the customer for the product (e.g. 1-5 stars).
     */
    private double rating;

    /**
     * Unique identifier for the product being reviewed.
     */
    private Long productId;

    /**
     * Optional review description provided by the customer.
     * This field can be empty if the customer only left a rating.
     */
    private Optional<String> reviewDescription;
}