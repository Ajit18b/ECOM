package com.Ecom.demoEcommerceWeb.Controller;

import com.Ecom.demoEcommerceWeb.Service.MerchantApplicationService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import com.Ecom.demoEcommerceWeb.requestmodels.AdminApplicationApproval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/merchantApplications")
public class MerchantApplicationController {
    private MerchantApplicationService merchantApplicationService;
    @Autowired
    public  MerchantApplicationController(MerchantApplicationService merchantApplicationService)
    {
        this.merchantApplicationService = merchantApplicationService;
    }
    @PostMapping("/apply")
    public void postApplication(@RequestBody MerchantApplication merchantApplicationRequest){
        merchantApplicationService.postApplication(merchantApplicationRequest);
    }
    @PutMapping("/secure/admin/application")
    public void approveApplication(@RequestHeader(value="Authorization") String token,
                                   @RequestBody AdminApplicationApproval adminApplicationApproval) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Admin page only");
        }
        merchantApplicationService.approveApplication(adminApplicationApproval,userEmail);
    }
    @DeleteMapping("/secure/admin/delete/application")
    public void deleteApplication(@RequestHeader(value="Authorization") String token,
                              @RequestParam Long applicationId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        merchantApplicationService.deleteApplication(applicationId);
    }
}
