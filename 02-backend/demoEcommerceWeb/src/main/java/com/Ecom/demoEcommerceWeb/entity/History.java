package com.Ecom.demoEcommerceWeb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "History")
@Data
public class History {
    public History(){}
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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name="checkout_date")
    private String checkoutDate;
    @Column(name="order_date")
    private String orderDate;
    @Column(name="title")
    private String title;
    @Column(name="seller")
    private String seller;
    @Column(name="description")
    private String description;
    @Column(name="img")
    private String img;
}
