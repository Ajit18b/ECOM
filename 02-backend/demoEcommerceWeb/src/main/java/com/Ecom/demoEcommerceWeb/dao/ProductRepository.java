package com.Ecom.demoEcommerceWeb.dao;

// Importing necessary entities and Spring Data JPA annotations
import com.Ecom.demoEcommerceWeb.entity.History;
import com.Ecom.demoEcommerceWeb.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Repository interface for Product entity.
 */
public interface ProductRepository extends JpaRepository<Product,Long> {
    /**
     * Method to find a page of Product entities by title containing a certain string.
     *
     * @param title the title to search for
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of Product entities with titles containing the specified string
     */
    Page<Product> findByTitleContaining(String title, Pageable pageable);

    /**
     * Method to find a page of Product entities by category.
     *
     * @param category the category to search for
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of Product entities with the specified category
     */
    Page<Product> findByCategory(String category, Pageable pageable);

    /**
     * Method to find a list of Product entities by a list of product IDs.
     *
     * @param product_ids a list of product IDs to search for
     * @return a list of Product entities with the specified IDs
     */
    @Query("select o from Product o where id in :product_ids")
    List<Product> findProductsByProductIds (@Param("product_ids") List<Long> productId);

    /**
     * Method to find a page of Product entities by merchant email.
     *
     * @param merchantEmail the merchant's email
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of Product entities associated with the specified merchant
     */
    Page<Product> findProductByMerchantEmail(String merchantEmail, Pageable pageable);
}