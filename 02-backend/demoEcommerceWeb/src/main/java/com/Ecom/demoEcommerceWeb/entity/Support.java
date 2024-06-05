package com.Ecom.demoEcommerceWeb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="support")
@Data
public class Support {
    public Support(String title,String querry){
        this.title = title;
        this.querry = querry;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="user_email")
    private String userEmail;
    @Column(name="title")
    private String title;
    @Column(name="querry")
    private String querry;
    @Column(name="admin_email")
    private String adminEmail;
    @Column(name="response")
    private String response;
    @Column(name="closed")
    private boolean closed;
}
