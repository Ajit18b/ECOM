package com.Ecom.demoEcommerceWeb.Controller;

// Importing necessary services, utility classes, and request models
import com.Ecom.demoEcommerceWeb.Service.ReviewService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.requestmodels.ReviewRequest;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for review-related operations.
 */
@CrossOrigin("http://localhost:3000") // enable CORS for requests from localhost:3000
@RestController
@RequestMapping("/api/reviews") // base URL for review-related endpoints
public class ReviewController {
    // Private field for the ReviewService instance
    private ReviewService reviewService;

    /**
     * Constructor to inject the ReviewService instance.
     *
     * @param reviewService the ReviewService instance
     */
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    /**
     * Endpoint to check if a user has reviewed a product.
     *
     * @param token the JWT token in the Authorization header
     * @param productId the ID of the product to check
     * @return true if the user has reviewed the product, false otherwise
     * @throws Exception if an error occurs
     */
    @GetMapping("/secure/user/product")
    public Boolean reviewProductByUser(@RequestHeader(value = "Authorization") String token,
                                       @RequestParam Long productId) throws Exception{
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Check if the user's email is missing
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        // Call the ReviewService method to check if the user has reviewed the product
        return reviewService.userReviewListed(userEmail,productId);
    }

    /**
     * Endpoint to post a new review.
     *
     * @param token the JWT token in the Authorization header
     * @param reviewRequest the request body containing review details
     * @throws Exception if an error occurs
     */
    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization")String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception{
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        // Check if the user's email is missing
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        // Call the ReviewService method to post the review
        reviewService.postReview(userEmail,reviewRequest);
    }
}