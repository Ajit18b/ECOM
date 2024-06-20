package com.Ecom.demoEcommerceWeb.dao;

// Importing necessary entities and Spring Data JPA annotations
import com.Ecom.demoEcommerceWeb.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Repository interface for Message entity.
 */
public interface MessageRepository extends JpaRepository<Message, Long> {
    /**
     * Method to find a page of Message entities by user email.
     *
     * @param userEmail the user's email
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of Message entities for the user
     */
    Page<Message> findByUserEmail(String userEmail, Pageable pageable);

    /**
     * Method to find a page of Message entities by closed status.
     *
     * @param closed the closed status (true or false)
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of Message entities with the specified closed status
     */
    Page<Message> findByClosed(boolean closed, Pageable pageable);
}