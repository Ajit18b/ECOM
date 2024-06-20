package com.Ecom.demoEcommerceWeb.entity;

// Importing necessary annotations and Lombok's @Data
import lombok.Data;

import javax.persistence.*;

/**
 * Entity class representing a history entry in the e-commerce system.
 */
@Entity
@Table(name = "History")
@Data
public class History {
    /**
     * No-argument constructor for History entity.
     */
    public History(){}

    /**
     * Constructor for History entity with all fields.
     *
     * @param userEmail the user's email
     * @param checkoutDate the date of checkout
     * @param orderDate the date of order
     * @param title the title of the product
     * @param seller the seller of the product
     * @param description the description of the product
     * @param img the image URL of the product
     */
    public History(String userEmail,String checkoutDate,String orderDate,String title,
                   String seller,String description,String img){
        this.userEmail=userEmail;
        this.checkoutDate=checkoutDate;
        this.orderDate=orderDate;
        this.title=title;
        this.seller=seller;
        this.description=description;
        this.img=img;
    }

    /**
     * Unique identifier for the history entry.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * Email of the user who performed the action.
     */
    @Column(name = "user_email")
    private String userEmail;

    /**
     * Date when the checkout was performed.
     */
    @Column(name="checkout_date")
    private String checkoutDate;

    /**
     * Date when the order was placed.
     */
    @Column(name="order_date")
    private String orderDate;

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
     * Image URL of the product.
     */
    @Column(name="img")
    private String img;
}