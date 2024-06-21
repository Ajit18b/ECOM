package com.Ecom.demoEcommerceWeb.Service;

// Importing necessary dependencies
import com.Ecom.demoEcommerceWeb.dao.MerchantApplicationRepository;
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.requestmodels.AdminApplicationApproval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service class for merchant application-related operations.
 */
@Service
@Transactional
public class MerchantApplicationService {

    /**
     * Repository for merchant application-related operations.
     */
    private MerchantApplicationRepository merchantApplicationRepository;

    /**
     * Constructor to initialize the service with the merchant application repository.
     *
     * @param merchantApplicationRepository The repository for merchant application-related operations.
     */
    @Autowired
    public MerchantApplicationService(MerchantApplicationRepository merchantApplicationRepository) {
        this.merchantApplicationRepository = merchantApplicationRepository;
    }

    /**
     * Creates a new merchant application based on the provided request.
     *
     * @param merchantApplicationRequest The request containing merchant application details.
     */
    public void postApplication(MerchantApplication merchantApplicationRequest) {
        // Create a new merchant application entity
        MerchantApplication application = new MerchantApplication(
                merchantApplicationRequest.getFirstName(),
                merchantApplicationRequest.getLastName(),
                merchantApplicationRequest.getBusinessName(),
                merchantApplicationRequest.getMerchantEmail(),
                merchantApplicationRequest.getMerchantPhone(),
                merchantApplicationRequest.getRemark()
        );
        // Save the new merchant application
        merchantApplicationRepository.save(application);
    }

    /**
     * Approves a merchant application based on the provided approval request.
     *
     * @param adminApplicationApproval The approval request containing the application ID and response.
     * @param userEmail               The email of the admin user approving the application.
     * @throws Exception If the application is not found.
     */
    public void approveApplication(AdminApplicationApproval adminApplicationApproval, String userEmail) throws Exception {
        // Find the merchant application by ID
        Optional<MerchantApplication> merchantApplication = merchantApplicationRepository.findById(adminApplicationApproval.getId());
        if (!merchantApplication.isPresent()) {
            throw new Exception("Application not found");
        }
        // Update the merchant application with the admin's email and response
        merchantApplication.get().setAdminEmail(userEmail);
        merchantApplication.get().setResponse(adminApplicationApproval.getResponse());
        merchantApplication.get().setApproval(true);
        // Save the updated merchant application
        merchantApplicationRepository.save(merchantApplication.get());
    }
//    public void deleteApplication(Long applicationId) throws Exception {
//        Optional<Product> product = MerchantApplicationRepository.findById(productId);
//
//        if (!product.isPresent()) {
//            throw new Exception("Product not found");
//        }
//
//        // Delete the product
//        productRepository.delete(product.get());
//        // Remove related checkout records
//        checkoutRepository.deleteAllByProductId(productId);
//        // Remove related review records
//        reviewRepository.deleteAllByProductId(productId);
//    }

}