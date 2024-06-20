package com.Ecom.demoEcommerceWeb.config;

// Importing the necessary entity classes
import com.Ecom.demoEcommerceWeb.entity.MerchantApplication;
import com.Ecom.demoEcommerceWeb.entity.Message;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.entity.Review;

// Importing Spring Data REST and CORS configuration classes
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * Configuration class for customizing Spring Data REST settings.
 */
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    /**
     * Allowed origins for CORS configuration.
     */
    private String theAllowedOrigins = "http://localhost:3000"; // specifying the allowed origin for CORS

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        /**
         * Array of HTTP methods to be disabled for certain entities.
         */
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST, // disable POST requests
                HttpMethod.PATCH, // disable PATCH requests
                HttpMethod.DELETE, // disable DELETE requests
                HttpMethod.PUT // disable PUT requests
        };

        /**
         * Expose IDs for the following entities:
         * - Product
         * - Review
         * - Message
         * - MerchantApplication
         */
        config.exposeIdsFor(Product.class); // expose IDs for Product entity
        config.exposeIdsFor(Review.class); // expose IDs for Review entity
        config.exposeIdsFor(Message.class); // expose IDs for Message entity
        config.exposeIdsFor(MerchantApplication.class); // expose IDs for MerchantApplication entity

        /**
         * Disable unsupported HTTP methods for each entity.
         */
        disableHttpMethods(Product.class, config, theUnsupportedActions); // disable unsupported methods for Product
        disableHttpMethods(Review.class, config, theUnsupportedActions); // disable unsupported methods for Review
        disableHttpMethods(Message.class, config, theUnsupportedActions); // disable unsupported methods for Message
        disableHttpMethods(MerchantApplication.class, config, theUnsupportedActions); // disable unsupported methods for MerchantApplication

        /**
         * Configure CORS settings to allow requests from the specified origin.
         */
        cors.addMapping(config.getBasePath() + "/**") // add a CORS mapping for the entire API
                .allowedOrigins(theAllowedOrigins); // specify the allowed origin
    }

    /**
     * Helper method to disable HTTP methods for a given entity.
     *
     * @param theClass      the entity class
     * @param config       the RepositoryRestConfiguration
     * @param theUnsupportedActions the HTTP methods to be disabled
     */
    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration() // get the exposure configuration
                .forDomainType(theClass) // specify the entity class
                .withItemExposure((metdata, httpMethods) -> // configure item exposure
                        httpMethods.disable(theUnsupportedActions)) // disable unsupported methods for items
                .withCollectionExposure((metdata, httpMethods) -> // configure collection exposure
                        httpMethods.disable(theUnsupportedActions)); // disable unsupported methods for collections
    }
}