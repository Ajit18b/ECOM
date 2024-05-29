package com.Ecom.demoEcommerceWeb.Service;



import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.dao.ReviewRepository;
import com.Ecom.demoEcommerceWeb.entity.Review;
import com.Ecom.demoEcommerceWeb.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;


import java.sql.Date;
import java.time.LocalDate;

public class ReviewService {
    private ProductRepository productRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService (ProductRepository productRepository,
                          ReviewRepository reviewRepository){
        this.productRepository = productRepository;
        this.reviewRepository=reviewRepository;
    }
    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail,reviewRequest.getProductId());
        if(validateReview != null   ){
            throw new Exception("Review already created");
        }
        Review review = new Review();
        review.setProductId(reviewRequest.getProductId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(review.getReviewDescription().map(Object::toString).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }
}
