package com.Ecom.demoEcommerceWeb.responsemodel;

import com.Ecom.demoEcommerceWeb.entity.Product;
import lombok.Data;

@Data
public class CartCurrentOrderResponse {
    public CartCurrentOrderResponse(Product product,int daysLeft){
        this.product = product;
        //this.daysLeft = daysLeft;
    }
    private Product product;
    //private int daysLeft;
}
