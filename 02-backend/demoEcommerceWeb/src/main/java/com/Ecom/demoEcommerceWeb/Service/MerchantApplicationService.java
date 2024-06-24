package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.MerchantApplicationRepository;
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.requestmodels.AdminApplicationApproval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
    public void approveApplication(AdminApplicationApproval adminApplicationApproval,String userEmail) throws Exception{
        Optional<MerchantApplication> merchantApplication = merchantApplicationRepository.findById(adminApplicationApproval.getId());
        if(!merchantApplication.isPresent()){
            throw new Exception("Application not found");
        }
        merchantApplication.get().setAdminEmail(userEmail);
        merchantApplication.get().setResponse(adminApplicationApproval.getResponse());
        merchantApplication.get().setApproval(true);
        merchantApplicationRepository.save(merchantApplication.get());
    }
    public void deleteApplication(Long applicationId) throws Exception {

        Optional<MerchantApplication> application = merchantApplicationRepository.findById(applicationId);

        if (!application.isPresent()) {
            throw new Exception("Application not found");
        }

        merchantApplicationRepository.delete(application.get());
    }
}
