package com.Ecom.demoEcommerceWeb.responsemodel;

// Importing the Product entity class
import com.Ecom.demoEcommerceWeb.entity.Product;

// Importing Lombok's @Data
import lombok.Data;

/**
 * Response model for the current order in the cart.
 */
@Data
public class CartCurrentOrderResponse {

    /**
     * Constructor to initialize the response with a product and days left.
     *
     * @param product  The product in the current order.
     * @param daysLeft The number of days left for the order (not used in this implementation).
     */
    public CartCurrentOrderResponse(Product product, int daysLeft) {
        this.product = product;
        // this.daysLeft = daysLeft; (not implemented)
    }

    /**
     * The product in the current order.
     */
    private Product product;

    // /**
    //  * The number of days left for the order.
    //  */
    // private int daysLeft; (not implemented)
}