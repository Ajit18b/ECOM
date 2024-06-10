package com.Ecom.demoEcommerceWeb.Controller;

import com.Ecom.demoEcommerceWeb.Service.AdminService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.requestmodels.AddProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }
    @PutMapping("/secure/increase/product/quantity")
    public void increaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                     @RequestParam Long productId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.increaseProductQuantity(productId);
    }
    @PutMapping("/secure/decrease/product/quantity")
    public void decreaseProductQuantity(@RequestHeader(value="Authorization") String token,
                                     @RequestParam Long productId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.decreaseProductQuantity(productId);
    }
    @PostMapping("/secure/add/product")
    public void postProduct(@RequestHeader(value = "Authorization") String token,
                            @RequestBody AddProductRequest addProductRequest) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Admin page only");
        }
        adminService.postProduct(addProductRequest);
    }
    @DeleteMapping("/secure/delete/product")
    public void deleteProduct(@RequestHeader(value="Authorization") String token,
                           @RequestParam Long productId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.deleteProduct(productId);
    }

}

