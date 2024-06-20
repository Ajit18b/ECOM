package com.Ecom.demoEcommerceWeb.Controller;

// Importing necessary services, utility classes, and entities
import com.Ecom.demoEcommerceWeb.Service.MerchantApplicationService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import com.Ecom.demoEcommerceWeb.requestmodels.AdminApplicationApproval;

// Importing Spring annotations and classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for merchant application-related operations.
 */
@CrossOrigin("http://localhost:3000") // enable CORS for requests from localhost:3000
@RestController
@RequestMapping("/api/merchantApplications") // base URL for merchant application-related endpoints
public class MerchantApplicationController {
    // Private field for the MerchantApplicationService instance
    private MerchantApplicationService merchantApplicationService;

    /**
     * Constructor to inject the MerchantApplicationService instance.
     *
     * @param merchantApplicationService the MerchantApplicationService instance
     */
    @Autowired
    public MerchantApplicationController(MerchantApplicationService merchantApplicationService)
    {
        this.merchantApplicationService = merchantApplicationService;
    }

    /**
     * Endpoint to submit a new merchant application.
     *
     * @param merchantApplicationRequest the request body containing application details
     */
    @PostMapping("/apply")
    public void postApplication(@RequestBody MerchantApplication merchantApplicationRequest){
        // Call the MerchantApplicationService method to process the application
        merchantApplicationService.postApplication(merchantApplicationRequest);
    }

    /**
     * Endpoint for an admin to approve a merchant application.
     *
     * @param token the JWT token in the Authorization header
     * @param adminApplicationApproval the request body containing approval details
     * @throws Exception if the user is not an admin or if an error occurs
     */
    @PutMapping("/secure/admin/application")
    public void approveApplication(@RequestHeader(value="Authorization") String token,
                                   @RequestBody AdminApplicationApproval adminApplicationApproval) throws Exception{
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Extract the user type from the JWT token
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        // Check if the user is an admin
        if(admin == null ||!admin.equals("admin")){
            throw new Exception("Admin page only");
        }
        // Call the MerchantApplicationService method to approve the application
        merchantApplicationService.approveApplication(adminApplicationApproval,userEmail);
    }
}