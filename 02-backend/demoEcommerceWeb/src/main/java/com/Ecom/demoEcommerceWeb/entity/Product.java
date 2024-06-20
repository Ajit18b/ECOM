package com.Ecom.demoEcommerceWeb.entity;

// Importing necessary annotations and Lombok's @Data
import lombok.Data;

import javax.persistence.*;

/**
 * Entity class representing a product in the e-commerce system.
 */
@Entity
@Table(name = "product")
@Data
public class Product {

    /**
     * No-argument constructor for Product entity.
     */
    public Product(){}

    /**
     * Constructor for Product entity with all fields.
     *
     * @param title the title of the product
     * @param seller the seller of the product
     * @param description the description of the product
     * @param quantity the total quantity of the product
     * @param quantityAvailable the quantity of the product currently available
     * @param category the category of the product
     * @param img the URL or path to the product's image
     * @param merchantEmail the email of the merchant who sells the product
     */
    public Product(String title, String seller, String description, int quantity, int quantityAvailable, String category, String img, String merchantEmail) {
        this.title = title;
        this.seller = seller;
        this.description = description;
        this.quantity = quantity;
        this.quantityAvailable = quantityAvailable;
        this.category = category;
        this.img = img;
        this.merchantEmail = merchantEmail;
    }

    /**
     * Unique identifier for the product.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    /**
     * Title of the product.
     */
    @Column(name="title")
    private String title;

    /**
     * Seller of the product.
     */
    @Column(name="seller")
    private String seller;

    /**
     * Description of the product.
     */
    @Column(name="description")
    private String description;

    /**
     * Total quantity of the product.
     */
    @Column(name="quantity")
    private int quantity;

    /**
     * Quantity of the product currently available.
     */
    @Column(name="quantity_available")
    private int quantityAvailable;

    /**
     * Category of the product.
     */
    @Column(name="category")
    private String category;

    /**
     * URL or path to the product's image.
     */
    @Column(name="img")
    private String img;

    /**
     * Email of the merchant who sells the product.
     */
    @Column(name="merchant_email")
    private String merchantEmail;
}