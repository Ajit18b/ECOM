package com.Ecom.demoEcommerceWeb.Controller;

// Importing necessary services and utility classes
import com.Ecom.demoEcommerceWeb.Service.AdminService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;

// Importing Spring annotations and classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for admin-related operations.
 */
@CrossOrigin("http://localhost:3000") // enable CORS for requests from localhost:3000
@RestController
@RequestMapping("/api/admin") // base URL for admin-related endpoints
public class AdminController {
    // Private field for the AdminService instance
    private AdminService adminService;

    /**
     * Constructor to inject the AdminService instance.
     *
     * @param adminService the AdminService instance
     */
    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    /**
     * Endpoint to increase the quantity of a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to update
     * @throws Exception if the user is not an admin or if an error occurs
     */
    @PutMapping("/secure/increase/product/quantity")
    public void increaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                        @RequestParam Long productId) throws Exception {
        // Extract the user type from the JWT token
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        // Check if the user is an admin
        if (admin == null ||!admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        // Call the AdminService method to increase the product quantity
        adminService.increaseProductQuantity(productId);
    }

    /**
     * Endpoint to decrease the quantity of a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to update
     * @throws Exception if the user is not an admin or if an error occurs
     */
    @PutMapping("/secure/decrease/product/quantity")
    public void decreaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                        @RequestParam Long productId) throws Exception {
        // Extract the user type from the JWT token
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        // Check if the user is an admin
        if (admin == null ||!admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        // Call the AdminService method to decrease the product quantity
        adminService.decreaseProductQuantity(productId);
    }

    /**
     * Endpoint to add a new product.
     *
     * @param token the JWT token in the Authorization header
     * @param addProductRequest the request body containing product details
     * @throws Exception if the user is not an admin or if an error occurs
     */
    @PostMapping("/secure/add/product")
    public void postProduct(@RequestHeader(value = "Authorization") String token,
                            @RequestBody AddProductRequest addProductRequest) throws Exception {
        // Extract the user type from the JWT token
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        // Check if the user is an admin
        if(admin == null ||!admin.equals("admin")){
            throw new Exception("Admin page only");
        }
        // Call the AdminService method to add the product
        adminService.postProduct(addProductRequest);
    }

    /**
     * Endpoint to delete a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to delete
     * @throws Exception if the user is not an admin or if an error occurs
     */
    @DeleteMapping("/secure/delete/product")
    public void deleteProduct(@RequestHeader(value="Authorization") String token,
                              @RequestParam Long productId) throws Exception {
        // Extract the user type from the JWT token
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        // Check if the user is an admin
        if (admin == null ||!admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        // Call the AdminService method to delete the product
        adminService.deleteProduct(productId);
    }

}