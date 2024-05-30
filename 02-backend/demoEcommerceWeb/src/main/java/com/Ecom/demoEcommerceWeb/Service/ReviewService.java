package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.dao.ReviewRepository;
import com.Ecom.demoEcommerceWeb.entity.Review;
import com.Ecom.demoEcommerceWeb.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {

        this.reviewRepository = reviewRepository;
    }
    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail, reviewRequest.getProductId());
        if (validateReview != null) {
            throw new Exception("Review already added");
        }
        Review review = new Review();
        review.setProductId(reviewRequest.getProductId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        //review.setReviewDescription(reviewRequest.getReviewDescription().orElse(null));
        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Objects::toString
            ).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }
    public Boolean userReviewListed(String userEmail,Long productId){
        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail,productId);
        if(validateReview != null){
            return true;
        }else{
            return false;
        }
    }
}
