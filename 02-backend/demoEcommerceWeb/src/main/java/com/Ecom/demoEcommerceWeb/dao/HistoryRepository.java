package com.Ecom.demoEcommerceWeb.dao;

// Importing necessary entities and Spring Data JPA annotations
import com.Ecom.demoEcommerceWeb.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Repository interface for History entity.
 */
public interface HistoryRepository extends JpaRepository<History,Long> {
    /**
     * Method to find a page of History entities for a given user email.
     *
     * @param userEmail the user's email
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of History entities for the user
     */
    Page<History> findProductByUserEmail(@RequestParam("email") String userEmail, Pageable pageable);
}