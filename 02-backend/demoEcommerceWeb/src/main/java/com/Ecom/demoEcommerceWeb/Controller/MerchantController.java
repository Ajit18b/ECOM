package com.Ecom.demoEcommerceWeb.Controller;

// Importing necessary services, utility classes, request models, and annotations
import com.Ecom.demoEcommerceWeb.Service.MerchantApplicationService;
import com.Ecom.demoEcommerceWeb.Service.MerchantService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for merchant-related operations.
 */
@CrossOrigin("http://localhost:3000") // enable CORS for requests from localhost:3000
@RestController
@RequestMapping("/api/merchant") // base URL for merchant-related endpoints
public class MerchantController {
    // Private field for the MerchantService instance
    private MerchantService merchantService;
    private MerchantApplicationService merchantApplicationService;

    /**
     * Constructor to inject the MerchantService instance.
     *
     * @param merchantService the MerchantService instance
     */
    @Autowired
    public MerchantController(MerchantService merchantService){
        this.merchantService = merchantService;
    }

    /**
     * Endpoint to increase the quantity of a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to update
     * @throws Exception if the user is not a merchant or if an error occurs
     */
    @PutMapping("/secure/increase/product/quantity")
    public void increaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                        @RequestParam Long productId) throws Exception {
        // Extract the user type from the JWT token
        String merchant = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        // Check if the user is a merchant
        if (merchant == null || !merchant.equals("merchant")) {
            throw new Exception("Merchant page only");
        }
        // Call the MerchantService method to increase the product quantity
        merchantService.increaseProductQuantity(productId);
    }

    /**
     * Endpoint to decrease the quantity of a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to update
     * @throws Exception if the user is not a merchant or if an error occurs
     */
    @PutMapping("/secure/decrease/product/quantity")
    public void decreaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                        @RequestParam Long productId) throws Exception {
        // Extract the user type from the JWT token
        String merchant = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        // Check if the user is a merchant
        if (merchant == null || !merchant.equals("merchant")) {
            throw new Exception("Merchant page only");
        }
        // Call the MerchantService method to decrease the product quantity
        merchantService.decreaseProductQuantity(productId);
    }

    /**
     * Endpoint to add a new product.
     *
     * @param token the JWT token in the Authorization header
     * @param addProductRequest the request body containing product details
     * @throws Exception if the user is not a merchant or if an error occurs
     */
    @PostMapping("/secure/add/product")
    public void postProduct(@RequestHeader(value = "Authorization") String token,
                            @RequestBody AddProductRequest addProductRequest) throws Exception {
        // Extract the user type from the JWT token
        String merchant = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        // Check if the user is a merchant
        if(merchant == null || !merchant.equals("merchant")){
            throw new Exception("Merchant page only");
        }
        // Call the MerchantService method to add the product
        merchantService.postProduct(addProductRequest);
    }

    /**
     * Endpoint to delete a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to delete
     * @throws Exception if the user is not a merchant or if an error occurs
     */
    @DeleteMapping("/secure/delete/product")
    public void deleteProduct(@RequestHeader(value="Authorization") String token,
                              @RequestParam Long productId) throws Exception {
        // Extract the user type from the JWT token
        String merchant = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        // Check if the user is a merchant
        if (merchant == null || !merchant.equals("merchant")) {
            throw new Exception("Merchant page only");
        }
        // Call the MerchantService method to delete the product
        merchantService.deleteProduct(productId);
    }
    @DeleteMapping("/secure/delete/merchantapplication")
    public void deleteApplicationMerchant(@RequestParam Long applicationId) throws Exception {

    }
}