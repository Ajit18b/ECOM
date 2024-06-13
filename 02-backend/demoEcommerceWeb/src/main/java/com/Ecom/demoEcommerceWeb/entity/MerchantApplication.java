package com.Ecom.demoEcommerceWeb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "merchant_applications")
@Data
public class MerchantApplication {

    public MerchantApplication(){}

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="business_name")
    private String businessName;

    @Column(name = "merchant_email")
    private String merchantEmail;

    @Column(name = "merchant_phone")
    private String merchantPhone;

    @Column(name="remark")
    private String remark;

    @Column(name="admin_email")
    private String adminEmail;

    @Column(name="approval")
    private boolean approval;
}
