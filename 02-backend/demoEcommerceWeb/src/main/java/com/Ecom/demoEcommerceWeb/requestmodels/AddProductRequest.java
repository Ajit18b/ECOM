package com.Ecom.demoEcommerceWeb.requestmodels;

import lombok.Data;

@Data
public class AddProductRequest {
    private String title;
    private String seller;
    private String description;
    private int quantity;
    private String category;
    private String img;
}
