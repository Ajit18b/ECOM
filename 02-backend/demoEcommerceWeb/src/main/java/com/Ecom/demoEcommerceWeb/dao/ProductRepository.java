package com.Ecom.demoEcommerceWeb.dao;

import com.Ecom.demoEcommerceWeb.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;


public interface ProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
    Page<Product> findByCategory(@RequestParam("category") String category, Pageable pageable);
    @Query("select o from Product o where id in :product_ids")
    List<Product> findProductsByProductIds (@Param("product_ids") List<Long> productId);
    @Query("select o from Product o where merchant_email in :product_merchant_emails")
    List<Product> findProductsByMerchantEmail (@Param("product_merchant_emails") String merchantEmail);
    @Query("select o from Product o where id in :product_ids and merchant_email in :product_merchant_emails")
    Map<Product,String> findProductsByProductIdsAndMerchantEmail(@Param("product_ids") Long productId, @Param("product_merchant_emails") String merchantEmail);
}
