package com.Ecom.demoEcommerceWeb.dao;

// Importing necessary entities and Spring Data JPA annotations
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Repository interface for MerchantApplication entity.
 */
public interface MerchantApplicationRepository extends JpaRepository<MerchantApplication,Long> {
    /**
     * Method to find a page of MerchantApplication entities by merchant email.
     *
     * @param merchantEmail the merchant's email
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of MerchantApplication entities for the merchant
     */
    Page<MerchantApplication> findByMerchantEmail(String merchantEmail, Pageable pageable);

    /**
     * Method to find a page of MerchantApplication entities by approval status.
     *
     * @param approval the approval status (true or false)
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of MerchantApplication entities with the specified approval status
     */
    Page<MerchantApplication> findByApproval(boolean approval, Pageable pageable);

    /**
     * Method to find a page of MerchantApplication entities by response.
     *
     * @param response the response (e.g., approved, rejected, pending)
     * @param pageable pagination information (e.g., page number, page size)
     * @return a page of MerchantApplication entities with the specified response
     */
    Page<MerchantApplication> findByResponse(String response, Pageable pageable);
}