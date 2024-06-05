package com.Ecom.demoEcommerceWeb.Controller;

import com.Ecom.demoEcommerceWeb.Service.SupportService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.entity.Support;
import com.nimbusds.oauth2.sdk.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/supportreq")
public class SupportController {
    private SupportService supportService;
    @Autowired
    public SupportController(SupportService supportService){
        this.supportService = supportService;
    }
    @PostMapping("/secure/add/support")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Support supportRequest){
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        supportService.postSupport(supportRequest,userEmail);
    }
}
