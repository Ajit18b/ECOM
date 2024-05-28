package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.CheckoutRepository;
import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.entity.Checkout;
import com.Ecom.demoEcommerceWeb.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    private ProductRepository productRepository;
    private CheckoutRepository checkoutRepository;
    public ProductService(ProductRepository productRepository,CheckoutRepository checkoutRepository){
        this.productRepository = productRepository;
        this.checkoutRepository = checkoutRepository;
    }
    public Product checkoutProduct (String userEmail,Long productId) throws Exception{
        Optional<Product> product = productRepository.findById(productId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail,productId);
        if (!product.isPresent()|| validateCheckout != null || product.get().getQuantityAvailable() <= 0){
            throw new Exception("Product not available");
        }
        product.get().setQuantityAvailable(product.get().getQuantityAvailable()-1);
        productRepository.save(product.get());
        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                product.get().getId()
        );
        checkoutRepository.save(checkout);
        return product.get();
    }
    public Boolean checkoutProductByUser(String userEmail,Long productId){
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);
        if (validateCheckout != null){
            return true;
        }else{
            return false;
        }
    }
   public int currentCount (String userEmail){
        return checkoutRepository.findProductsByUserEmail(userEmail).size();
   }
}
