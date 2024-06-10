package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;

import java.util.Optional;

public class MerchantService {
    private ProductRepository productRepository;
    public void postProduct(AddProductRequest addProductRequest) {
        Product product = new Product();
        product.setTitle(addProductRequest.getTitle());
        product.setSeller(addProductRequest.getSeller());
        product.setDescription(addProductRequest.getDescription());
        product.setQuantity(addProductRequest.getQuantity());
        product.setQuantityAvailable(addProductRequest.getQuantity());
        product.setCategory(addProductRequest.getCategory());
        product.setImg(addProductRequest.getImg());
        productRepository.save(product);
    }
    
}
