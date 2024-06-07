package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {
    private ProductRepository productRepository;
    @Autowired
    public AdminService (ProductRepository productRepository){
        this.productRepository = productRepository;
    }
    public void postProduct(AddProductRequest addProductRequest){
        Product product = new Product();
        product.setTitle(addProductRequest.getTitle());
        product.setSeller(addProductRequest.getSeller());
        product.setDescription(addProductRequest.getDescription());
        product.setQuantityAvailable(addProductRequest.getQuantity());
        product.setCategory(addProductRequest.getCategory());
        product.setImg(addProductRequest.getImg());
        productRepository.save(product);
    }
}
