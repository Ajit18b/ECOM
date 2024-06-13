package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.CheckoutRepository;
import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.dao.ReviewRepository;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class MerchantService {
    private ProductRepository productRepository;
    private ReviewRepository reviewRepository;
    private CheckoutRepository checkoutRepository;

    @Autowired
    public MerchantService (ProductRepository productRepository,
                         ReviewRepository reviewRepository,
                         CheckoutRepository checkoutRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }
    public void increaseProductQuantity(Long productId) throws Exception {

        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent()) {
            throw new Exception("Product not found");
        }

        product.get().setQuantityAvailable(product.get().getQuantityAvailable() + 1);
        product.get().setQuantity(product.get().getQuantity() + 1);

        productRepository.save(product.get());
    }

    public void decreaseProductQuantity(Long productId) throws Exception {

        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent() || product.get().getQuantityAvailable() <= 0 || product.get().getQuantity() <= 0) {
            throw new Exception("Product not found or quantity locked");
        }

        product.get().setQuantityAvailable(product.get().getQuantityAvailable() - 1);
        product.get().setQuantity(product.get().getQuantity() - 1);

        productRepository.save(product.get());
    }
    public void postProduct(AddProductRequest addProductRequest) {
        Product product = new Product();
        product.setTitle(addProductRequest.getTitle());
        product.setSeller(addProductRequest.getSeller());
        product.setDescription(addProductRequest.getDescription());
        product.setQuantity(addProductRequest.getQuantity());
        product.setQuantityAvailable(addProductRequest.getQuantity());
        product.setCategory(addProductRequest.getCategory());
        product.setMerchantEmail(addProductRequest.getMerchantEmail());
        product.setImg(addProductRequest.getImg());
        productRepository.save(product);
    }
    public void deleteProduct(Long productId) throws Exception {

        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent()) {
            throw new Exception("Product not found");
        }

        productRepository.delete(product.get());
        checkoutRepository.deleteAllByProductId(productId);
        reviewRepository.deleteAllByProductId(productId);
    }

}
