package com.Ecom.demoEcommerceWeb.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {
    public Checkout(){}
    public Checkout(String userEmail,String checkoutDate,String returnDate,Long productId){
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.productId = productId;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="user_email")
    private String userEmail;
    @Column(name = "checkout_date")
    private  String checkoutDate;
    @Column(name = "return_date")
    private String returnDate;
    @Column(name="product_id")
    private Long productId;
}
