package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
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
    @Autowired
    public MerchantService (ProductRepository productRepository){
        this.productRepository = productRepository;
    }
    public void increaseProductQuantity(Long productId, String merchantEmail) throws Exception {
        Map<Product, String> productMap = productRepository.findProductsByProductIdsAndMerchantEmail(productId, merchantEmail);

        if (productMap.isEmpty()) {
            throw new Exception("Product not found");
        }

        Product product = productMap.keySet().iterator().next();
        product.setQuantityAvailable(product.getQuantityAvailable() + 1);
        product.setQuantity(product.getQuantity() + 1);

        productRepository.save(product);
    }
/*    public void decreaseProductQuantity(Long productId, String merchantEmail) throws Exception {
        Map<Product,String> productOptional = productRepository.findProductsByProductIdsAndMerchantEmail(productId, merchantEmail);

        if (!productOptional.isPresent() || productOptional.get().getQuantityAvailable() <= 0 || productOptional.get().getQuantity() <= 0) {
            throw new Exception("Product not found or quantity locked");
        }

        Product product = productOptional.get();
        product.setQuantityAvailable(product.getQuantityAvailable() - 1);
        product.setQuantity(product.getQuantity() - 1);

        productRepository.save(product);
    }*/
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

}
