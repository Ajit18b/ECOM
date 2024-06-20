package com.Ecom.demoEcommerceWeb.entity;

// Importing necessary annotations and Lombok's @Data
import lombok.Data;

import javax.persistence.*;

/**
 * Entity class representing a merchant application in the e-commerce system.
 */
@Entity
@Table(name = "merchant_applications")
@Data
public class MerchantApplication {

    /**
     * No-argument constructor for MerchantApplication entity.
     */
    public MerchantApplication(){}

    /**
     * Constructor for MerchantApplication entity with all fields.
     *
     * @param firstName the first name of the merchant
     * @param lastName the last name of the merchant
     * @param businessName the name of the merchant's business
     * @param merchantEmail the email of the merchant
     * @param merchantPhone the phone number of the merchant
     * @param remark any additional remarks about the application
     */
    public MerchantApplication(String firstName,
                               String lastName,
                               String businessName,
                               String merchantEmail,
                               String merchantPhone,
                               String remark) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.businessName = businessName;
        this.merchantEmail = merchantEmail;
        this.merchantPhone = merchantPhone;
        this.remark = remark;
    }

    /**
     * Unique identifier for the merchant application.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    /**
     * First name of the merchant.
     */
    @Column(name="first_name")
    private String firstName;

    /**
     * Last name of the merchant.
     */
    @Column(name="last_name")
    private String lastName;

    /**
     * Name of the merchant's business.
     */
    @Column(name="business_name")
    private String businessName;

    /**
     * Email of the merchant.
     */
    @Column(name = "merchant_email")
    private String merchantEmail;

    /**
     * Phone number of the merchant.
     */
    @Column(name = "merchant_phone")
    private String merchantPhone;

    /**
     * Any additional remarks about the application.
     */
    @Column(name="remark")
    private String remark;

    /**
     * Email of the admin who processed the application.
     */
    @Column(name="admin_email")
    private String adminEmail;

    /**
     * Response to the merchant application.
     */
    @Column(name="response")
    private String response;

    /**
     * Approval status of the merchant application.
     */
    @Column(name="approval")
    private boolean approval;
}