package com.Ecom.demoEcommerceWeb.dao;

import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface MerchantApplicationRepository extends JpaRepository <MerchantApplication,Long>{
    Page<MerchantApplication> findByMerchantEmail(@RequestParam("merchant_email")String merchantEmail, Pageable pageable);
    Page<MerchantApplication> findByApproval(@RequestParam("approval")boolean approval,Pageable pageable);
}
