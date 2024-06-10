package com.Ecom.demoEcommerceWeb.Controller;

import com.Ecom.demoEcommerceWeb.Service.MerchantService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/merchant")
public class MerchantController {
    private MerchantService merchantService;
    @PostMapping("/secure/add/product")
    public void postProduct(@RequestHeader(value = "Authorization") String token,
                            @RequestBody AddProductRequest addProductRequest) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Admin page only");
        }
        merchantService.postProduct(addProductRequest);
    }
}
