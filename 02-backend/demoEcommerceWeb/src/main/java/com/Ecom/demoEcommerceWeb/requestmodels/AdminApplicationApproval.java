package com.Ecom.demoEcommerceWeb.requestmodels;

// Importing Lombok's @Data
import lombok.Data;

/**
 * Data transfer object for admin application approval.
 */
@Data
public class AdminApplicationApproval {

    /**
     * Unique identifier for the admin application.
     */
    private Long id;

    /**
     * Response from the admin regarding the application approval (e.g. approved, rejected, pending).
     */
    private String response;
}