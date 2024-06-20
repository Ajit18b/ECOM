package com.Ecom.demoEcommerceWeb.Service;

// Importing necessary dependencies
import com.Ecom.demoEcommerceWeb.dao.CheckoutRepository;
import com.Ecom.demoEcommerceWeb.dao.HistoryRepository;
import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.entity.Checkout;
import com.Ecom.demoEcommerceWeb.entity.History;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.responsemodel.CartCurrentOrderResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * Service class for product-related operations.
 */
@Service
@Transactional
public class ProductService {

    /**
     * Repository for product-related operations.
     */
    private ProductRepository productRepository;

    /**
     * Repository for checkout-related operations.
     */
    private CheckoutRepository checkoutRepository;

    /**
     * Repository for history-related operations.
     */
    private HistoryRepository historyRepository;

    /**
     * Constructor to initialize the service with necessary repositories.
     *
     * @param productRepository  Repository for product-related operations.
     * @param checkoutRepository Repository for checkout-related operations.
     * @param historyRepository  Repository for history-related operations.
     */
    public ProductService(ProductRepository productRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        // Initialize the product repository
        this.productRepository = productRepository;
        // Initialize the checkout repository
        this.checkoutRepository = checkoutRepository;
        // Initialize the history repository
        this.historyRepository = historyRepository;
    }

    /**
     * Checks out a product and updates the product quantity and creates a new checkout record.
     *
     * @param userEmail The email of the user checking out the product.
     * @param productId The ID of the product to check out.
     * @return The checked out product.
     * @throws Exception If the product is not available.
     */
    public Product checkoutProduct(String userEmail, Long productId) throws Exception {
        // Find the product by ID
        Optional<Product> product = productRepository.findById(productId);
        // Check if the product is already checked out by the user
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);
        // Check if the product is available
        if (!product.isPresent() || validateCheckout != null || product.get().getQuantityAvailable() <= 0) {
            // Throw an exception if the product is not available
            throw new Exception("Product not available");
        }
        // Update the product quantity
        product.get().setQuantityAvailable(product.get().getQuantityAvailable() - 1);
        // Save the updated product
        productRepository.save(product.get());
        // Create a new checkout record
        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                product.get().getId()
        );
        // Save the checkout record
        checkoutRepository.save(checkout);
        // Return the checked out product
        return product.get();
    }

    /**
     * Checks if a product is already checked out by the user.
     *
     * @param userEmail The email of the user.
     * @param productId The ID of the product.
     * @return True if the product is already checked out, false otherwise.
     */
    public Boolean checkoutProductByUser(String userEmail, Long productId) {
        // Check if the product is already checked out by the user
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);
        // Return true if the product is already checked out, false otherwise
        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the current count of products in the user's cart.
     *
     * @param userEmail The email of the user.
     * @return The count of products in the user's cart.
     */
    public int currentCount(String userEmail) {
        // Find the checkout records for the user
        List<Checkout> checkoutList = checkoutRepository.findProductsByUserEmail(userEmail);
        // Return the count of checkout records
        return checkoutList.size();
    }

    /**
     * Returns the current orders of the user.
     *
     * @param userEmail The email of the user.
     * @return A list of current orders.
     * @throws Exception If an error occurs.
     */
    public List<CartCurrentOrderResponse> currentOrders(String userEmail) throws Exception {
        // Initialize an empty list to store the current orders
        List<CartCurrentOrderResponse> cartCurrentOrderResponses = new ArrayList<>();
        // Find the checkout records for the user
        List<Checkout> checkoutList = checkoutRepository.findProductsByUserEmail(userEmail);
        // Initialize an empty list to store the product IDs
        List<Long> productIdList = new ArrayList<>();
        // Iterate over the checkout records and add the product IDs to the list
        for (Checkout i : checkoutList) {
            productIdList.add(i.getProductId());
        }
        // Find the products corresponding to the product IDs
        List<Product> products = productRepository.findProductsByProductIds(productIdList);
        // Initialize a simple date format
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // Iterate over the products and calculate the time difference
        for (Product product : products) {
            // Find the corresponding checkout record
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getProductId() == product.getId()).findFirst();
            // Check if the checkout record exists
            if (checkout.isPresent()) {
                // Calculate the time difference
                Date d1 = sdf.parse(checkout.get().getCheckoutDate());
                Date d2 = sdf.parse(LocalDate.now().toString());
                TimeUnit time = TimeUnit.DAYS;
                long diff_time = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);
                // Create a new cart current order response
                cartCurrentOrderResponses.add(new CartCurrentOrderResponse(product, (int) diff_time));
            }
        }
        // Return the list of current orders
        return cartCurrentOrderResponses;
    }

    /**
     * Orders a product and updates the product quantity, removes the checkout record, and creates a new history record.
     *
     * @param userEmail The email of the user ordering the product.
     * @param productId The ID of the product to order.
     * @throws Exception If the product does not exist.
     */
    public void orderProduct(String userEmail, Long productId) throws Exception {
        // Find the product by ID
        Optional<Product> product = productRepository.findById(productId);
        // Check if the product exists
        if (!product.isPresent()) {
            // Throw an exception if the product does not exist
            throw new Exception("Product does not exist!!");
        }
        // Find the checkout record for the user and product
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);
        // Check if the checkout record exists
        if (validateCheckout == null) {
            // Throw an exception if the checkout record does not exist
            throw new Exception("Product does not exist!!");
        }
        // Update the product quantity
        product.get().setQuantityAvailable(product.get().getQuantityAvailable());
        // Save the updated product
        productRepository.save(product.get());
        // Remove the checkout record
        checkoutRepository.deleteById(validateCheckout.getId());
        // Create a new history record
        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                product.get().getTitle(),
                product.get().getSeller(),
                product.get().getDescription(),
                product.get().getImg()
        );
        // Save the history record
        historyRepository.save(history);
    }

    /**
     * Removes a product from the user's cart and updates the product quantity.
     *
     * @param userEmail The email of the user.
     * @param productId The ID of the product to remove.
     * @throws Exception If the product does not exist.
     */
    public void removeProduct(String userEmail, Long productId) throws Exception {
        // Find the product by ID
        Optional<Product> product = productRepository.findById(productId);
        // Check if the product exists
        if (!product.isPresent()) {
            // Throw an exception if the product does not exist
            throw new Exception("Product does not exist!!");
        }
        // Find the checkout record for the user and product
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);
        // Check if the checkout record exists
        if (validateCheckout == null) {
            // Throw an exception if the checkout record does not exist
            throw new Exception("Product does not exist!!");
        }
        // Update the product quantity
        product.get().setQuantityAvailable(product.get().getQuantityAvailable() + 1);
        // Save the updated product
        productRepository.save(product.get());
        // Remove the checkout record
        checkoutRepository.deleteById(validateCheckout.getId());
    }
}