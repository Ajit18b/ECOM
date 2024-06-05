package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.SupportRepository;
import com.Ecom.demoEcommerceWeb.entity.Support;
import com.nimbusds.oauth2.sdk.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SupportService {
   private SupportRepository supportRepository;
   @Autowired
    public SupportService(SupportRepository supportRepository){
       this.supportRepository = supportRepository;
   }
   public void postSupport(Support supportRequest,String userEmail){
      Support support = new Support(supportRequest.getTitle(),supportRequest.getQuerry());
      support.setUserEmail(userEmail);
      supportRepository.save(support);
   }
}
