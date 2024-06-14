package com.Ecom.demoEcommerceWeb.config;

import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import com.Ecom.demoEcommerceWeb.entity.Message;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.entity.Review;
//import com.Ecom.demoEcommerceWeb.entity.Support;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigins = "http://localhost:3000";
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };
        config.exposeIdsFor(Product.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);
        config.exposeIdsFor(MerchantApplication.class);

        disableHttpMethods(Product.class,config,theUnsupportedActions);
        disableHttpMethods(Review.class,config,theUnsupportedActions);
        disableHttpMethods(Message.class,config,theUnsupportedActions);
        disableHttpMethods(MerchantApplication.class,config,theUnsupportedActions);
        /*Configuration mapping*/
        cors.addMapping(config.getBasePath()+"/**")
                .allowedOrigins(theAllowedOrigins);
    }
    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }
}
