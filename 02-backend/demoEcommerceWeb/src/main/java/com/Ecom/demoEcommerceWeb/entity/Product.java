package com.Ecom.demoEcommerceWeb.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "seller")
    private String seller;
    @Column(name = "description")
    private String description;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "quantity_available")
    private int quantityAvailable;
    @Column(name = "category")
    private String category;
    @Column(name = "img")
    private String img;
    @Column(name="merchant_email")
    private String merchantEmail;
}
