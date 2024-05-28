package com.Ecom.demoEcommerceWeb.Controller;

import com.Ecom.demoEcommerceWeb.Service.ProductService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;
    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }
    @GetMapping("/secure/currentcounts/count")
    public int currentCount(@RequestHeader(value = "Authorization") String token){
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return productService.currentCount(userEmail);
    }
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutProductByUser(@RequestHeader(value = "Authorization") String token,
                                         @RequestParam Long productId){
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return productService.checkoutProductByUser(userEmail,productId);
    }
    @PutMapping("/secure/checkout")
    public Product checkoutProduct(@RequestHeader(value = "Authorization") String token,
                                   @RequestParam Long productId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return productService.checkoutProduct(userEmail,productId);
    }
}
