package com.Ecom.demoEcommerceWeb.Controller;

import com.Ecom.demoEcommerceWeb.Service.MerchantService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/merchant")
public class MerchantController {
    private MerchantService merchantService;
    @Autowired
    public MerchantController(MerchantService merchantService){
        this.merchantService = merchantService;
    }
    @PutMapping("/secure/increase/product/quantity")
    public void increaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                        @RequestParam Long productId) throws Exception {
        String merchant = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (merchant == null || !merchant.equals("merchant")) {
            throw new Exception("Merchant page only");
        }
        merchantService.increaseProductQuantity(productId);
    }
    @PutMapping("/secure/decrease/product/quantity")
    public void decreaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                        @RequestParam Long productId) throws Exception {
        String merchant = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (merchant == null || !merchant.equals("merchant")) {
            throw new Exception("Merchant page only");
        }
        merchantService.decreaseProductQuantity(productId);
    }
    @PostMapping("/secure/add/product")
    public void postProduct(@RequestHeader(value = "Authorization") String token,
                            @RequestBody AddProductRequest addProductRequest) throws Exception {
        String merchant = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        if(merchant == null || !merchant.equals("merchant")){
            throw new Exception("Merchant page only");
        }
        merchantService.postProduct(addProductRequest);
    }
    @DeleteMapping("/secure/delete/product")
    public void deleteProduct(@RequestHeader(value="Authorization") String token,
                              @RequestParam Long productId) throws Exception {
        String merchant = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (merchant == null || !merchant.equals("merchant")) {
            throw new Exception("Merchant page only");
        }
        merchantService.deleteProduct(productId);
    }


}
