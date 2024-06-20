package com.Ecom.demoEcommerceWeb.requestmodels;

// Importing Lombok's @Data
import lombok.Data;

/**
 * Data transfer object for admin question request.
 */
@Data
public class AdminQuestionRequest {

    /**
     * Unique identifier for the question.
     */
    private Long id;

    /**
     * Response from the admin to the question.
     */
    private String response;
}