package com.Ecom.demoEcommerceWeb.Service;

// Importing necessary dependencies
import com.Ecom.demoEcommerceWeb.dao.CheckoutRepository;
import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.dao.ReviewRepository;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service class for admin-related operations.
 */
@Service
@Transactional
public class AdminService {

    /**
     * Repository for product-related operations.
     */
    private ProductRepository productRepository;

    /**
     * Repository for review-related operations.
     */
    private ReviewRepository reviewRepository;

    /**
     * Repository for checkout-related operations.
     */
    private CheckoutRepository checkoutRepository;

    /**
     * Constructor to initialize the service with necessary repositories.
     *
     * @param productRepository  Repository for product-related operations.
     * @param reviewRepository   Repository for review-related operations.
     * @param checkoutRepository Repository for checkout-related operations.
     */
    @Autowired
    public AdminService(ProductRepository productRepository,
                        ReviewRepository reviewRepository,
                        CheckoutRepository checkoutRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    /**
     * Increases the quantity of a product by 1.
     *
     * @param productId The ID of the product to increase quantity.
     * @throws Exception If the product is not found.
     */
    public void increaseProductQuantity(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent()) {
            throw new Exception("Product not found");
        }

        // Increase the quantity available and total quantity by 1
        product.get().setQuantityAvailable(product.get().getQuantityAvailable() + 1);
        product.get().setQuantity(product.get().getQuantity() + 1);

        // Save the updated product
        productRepository.save(product.get());
    }

    /**
     * Decreases the quantity of a product by 1.
     *
     * @param productId The ID of the product to decrease quantity.
     * @throws Exception If the product is not found or quantity is locked.
     */
    public void decreaseProductQuantity(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent() || product.get().getQuantityAvailable() <= 0 || product.get().getQuantity() <= 0) {
            throw new Exception("Product not found or quantity locked");
        }

        // Decrease the quantity available and total quantity by 1
        product.get().setQuantityAvailable(product.get().getQuantityAvailable() - 1);
        product.get().setQuantity(product.get().getQuantity() - 1);

        // Save the updated product
        productRepository.save(product.get());
    }

    /**
     * Creates a new product based on the provided request.
     *
     * @param addProductRequest The request containing product details.
     */
    public void postProduct(AddProductRequest addProductRequest) {
        Product product = new Product();
        product.setTitle(addProductRequest.getTitle());
        product.setSeller(addProductRequest.getSeller());
        product.setDescription(addProductRequest.getDescription());
        product.setQuantity(addProductRequest.getQuantity());
        product.setQuantityAvailable(addProductRequest.getQuantity());
        product.setCategory(addProductRequest.getCategory());
        product.setImg(addProductRequest.getImg());
        // Save the new product
        productRepository.save(product);
    }

    /**
     * Deletes a product by ID and removes related checkout and review records.
     *
     * @param productId The ID of the product to delete.
     * @throws Exception If the product is not found.
     */
    public void deleteProduct(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent()) {
            throw new Exception("Product not found");
        }

        // Delete the product
        productRepository.delete(product.get());
        // Remove related checkout records
        checkoutRepository.deleteAllByProductId(productId);
        // Remove related review records
        reviewRepository.deleteAllByProductId(productId);
    }
}