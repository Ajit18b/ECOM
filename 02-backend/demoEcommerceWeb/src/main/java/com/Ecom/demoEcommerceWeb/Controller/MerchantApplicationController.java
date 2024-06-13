package com.Ecom.demoEcommerceWeb.Controller;

import com.Ecom.demoEcommerceWeb.Service.MerchantApplicationService;
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/merchantApplication")
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
}
