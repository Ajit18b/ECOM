package com.Ecom.demoEcommerceWeb.Controller;

// Importing necessary services, utility classes, entities, and response models
import com.Ecom.demoEcommerceWeb.Service.ProductService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.responsemodel.CartCurrentOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for product-related operations.
 */
@CrossOrigin("http://localhost:3000") // enable CORS for requests from localhost:3000
@RestController
@RequestMapping("/api/products") // base URL for product-related endpoints
public class ProductController {
    // Private field for the ProductService instance
    private ProductService productService;

    /**
     * Constructor to inject the ProductService instance.
     *
     * @param productService the ProductService instance
     */
    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    /**
     * Endpoint to retrieve the current orders for a user.
     *
     * @param token the JWT token in the Authorization header
     * @return a list of current orders for the user
     * @throws Exception if an error occurs
     */
    @GetMapping("/secure/currentorders")
    public List<CartCurrentOrderResponse> currentOrders(@RequestHeader(value = "Authorization")String token)
            throws Exception{
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Call the ProductService method to retrieve current orders
        return productService.currentOrders(userEmail);
    }

    /**
     * Endpoint to retrieve the current count of products in the cart for a user.
     *
     * @param token the JWT token in the Authorization header
     * @return the current count of products in the cart
     */
    @GetMapping("/secure/currentcounts/count")
    public int currentCount(@RequestHeader(value = "Authorization") String token){
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Call the ProductService method to retrieve the current count
        return productService.currentCount(userEmail);
    }

    /**
     * Endpoint to check if a product has been checked out by a user.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to check
     * @return true if the product has been checked out, false otherwise
     */
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutProductByUser(@RequestHeader(value = "Authorization") String token,
                                         @RequestParam Long productId){
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Call the ProductService method to check if the product has been checked out
        return productService.checkoutProductByUser(userEmail,productId);
    }

    /**
     * Endpoint to checkout a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to checkout
     * @return the checked out product
     * @throws Exception if an error occurs
     */
    @PutMapping("/secure/checkout")
    public Product checkoutProduct(@RequestHeader(value = "Authorization") String token,
                                   @RequestParam Long productId) throws Exception{
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Call the ProductService method to checkout the product
        return productService.checkoutProduct(userEmail,productId);
    }

    /**
     * Endpoint to order a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to order
     * @throws Exception if an error occurs
     */
    @PutMapping("/secure/order")
    public void orderProduct(@RequestHeader(value="Authorization") String token,
                             @RequestParam Long productId) throws Exception{
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Call the ProductService method to order the product
        productService.orderProduct(userEmail,productId);
    }

    /**
     * Endpoint to remove a product from the cart.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to remove
     * @throws Exception if an error occurs
     */
    @PutMapping("/secure/remove")
    public void removeProduct(@RequestHeader(value="Authorization") String token,
                              @RequestParam Long productId) throws Exception{
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Call the ProductService method to remove the product
        productService.removeProduct(userEmail,productId);
    }
}