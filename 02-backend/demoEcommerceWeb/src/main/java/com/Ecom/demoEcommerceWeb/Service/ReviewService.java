package com.Ecom.demoEcommerceWeb.Service;

// Importing necessary dependencies
import com.Ecom.demoEcommerceWeb.dao.ReviewRepository;
import com.Ecom.demoEcommerceWeb.entity.Review;
import com.Ecom.demoEcommerceWeb.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Service class for review-related operations.
 */
@Service
@Transactional
public class ReviewService {

    /**
     * Repository for review-related operations.
     */
    private final ReviewRepository reviewRepository;

    /**
     * Constructor to initialize the service with the review repository.
     *
     * @param reviewRepository Repository for review-related operations.
     */
    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        // Initialize the review repository
        this.reviewRepository = reviewRepository;
    }

    /**
     * Posts a review and saves it to the database.
     *
     * @param userEmail The email of the user posting the review.
     * @param reviewRequest The review request object containing the review details.
     * @throws Exception If the review already exists.
     */
    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        // Check if the review already exists for the user and product
        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail, reviewRequest.getProductId());
        if (validateReview!= null) {
            // Throw an exception if the review already exists
            throw new Exception("Review already added");
        }
        // Create a new review object
        Review review = new Review();
        // Set the product ID
        review.setProductId(reviewRequest.getProductId());
        // Set the rating
        review.setRating(reviewRequest.getRating());
        // Set the user email
        review.setUserEmail(userEmail);
        // Set the review description if present
        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Objects::toString
            ).orElse(null));
        }
        // Set the current date
        review.setDate(Date.valueOf(LocalDate.now()));
        // Save the review to the database
        reviewRepository.save(review);
    }

    /**
     * Checks if a user has already reviewed a product.
     *
     * @param userEmail The email of the user.
     * @param productId The ID of the product.
     * @return True if the user has already reviewed the product, false otherwise.
     */
    public Boolean userReviewListed(String userEmail, Long productId) {
        // Check if the review exists for the user and product
        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail, productId);
        if (validateReview!= null) {
            // Return true if the review exists
            return true;
        } else {
            // Return false if the review does not exist
            return false;
        }
    }
}