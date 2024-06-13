package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.MerchantApplicationRepository;
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MerchantApplicationService {
    private MerchantApplicationRepository merchantApplicationRepository;
    @Autowired
    public MerchantApplicationService(MerchantApplicationRepository merchantApplicationRepository){
        this.merchantApplicationRepository=merchantApplicationRepository;
    }
    public void postApplication(MerchantApplication merchantApplicationRequest) {
        MerchantApplication application = new MerchantApplication (
                merchantApplicationRequest.getFirstName(),
                merchantApplicationRequest.getLastName(),
                merchantApplicationRequest.getBusinessName(),
                merchantApplicationRequest.getMerchantEmail(),
                merchantApplicationRequest.getMerchantPhone(),
                merchantApplicationRequest.getRemark()
                );
        merchantApplicationRepository.save(application);
    }
}
