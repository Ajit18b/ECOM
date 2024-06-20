package com.Ecom.demoEcommerceWeb.dao;

// Importing necessary entities and Spring Data JPA annotations
import com.Ecom.demoEcommerceWeb.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Repository interface for Review entity.
 */
public interface ReviewRepository extends JpaRepository<Review,Long> {
    /**
     * Method to find a page of Review entities by product ID.
     *
     * @param productId the product ID to search for
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of Review entities associated with the specified product
     */
    Page<Review> findByProductId(Long productId, Pageable pageable);

    /**
     * Method to find a single Review entity by user email and product ID.
     *
     * @param userEmail the user's email
     * @param productId the product ID
     * @return a single Review entity associated with the specified user and product
     */
    Review findByUserEmailAndProductId(String userEmail, Long productId);

    /**
     * Method to delete all Review entities associated with a product ID.
     *
     * @param productId the product ID to search for
     */
    @Modifying
    @Query("delete from Review where product_id in :product_id")
    void deleteAllByProductId(@Param("product_id") Long productId);
}