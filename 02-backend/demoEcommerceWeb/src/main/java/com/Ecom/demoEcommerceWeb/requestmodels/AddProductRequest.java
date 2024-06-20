package com.Ecom.demoEcommerceWeb.requestmodels;

// Importing Lombok's @Data
import lombok.Data;

/**
 * Data transfer object for adding a product to the e-commerce system.
 */
@Data
public class AddProductRequest {

    /**
     * Title of the product.
     */
    private String title;

    /**
     * Seller of the product.
     */
    private String seller;

    /**
     * Description of the product.
     */
    private String description;

    /**
     * Total quantity of the product.
     */
    private int quantity;

    /**
     * Category of the product.
     */
    private String category;

    /**
     * Email of the merchant who sells the product.
     */
    private String merchantEmail;

    /**
     * URL or path to the product's image.
     */
    private String img;
}