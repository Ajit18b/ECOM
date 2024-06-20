package com.Ecom.demoEcommerceWeb.config;

// Importing Okta's OAuth library
import com.okta.spring.boot.oauth.Okta;

// Importing Spring Security and configuration classes
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

/**
 * Configuration class for security settings.
 */
@Configuration
public class SecurityConfiguration {

    /**
     * Bean method to create a SecurityFilterChain instance.
     *
     * @param http the HttpSecurity instance
     * @return the SecurityFilterChain instance
     * @throws Exception if an error occurs during configuration
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable Cross Site Request Forgery (CSRF) protection
        http.csrf().disable();

        // Configure authorization for specific endpoints
        http.authorizeRequests(configurer ->
                        configurer
                                // Protect endpoints at /api/<type>/secure
                                .antMatchers("/api/products/secure/**",
                                        "/api/reviews/secure/**",
                                        "/api/messages/secure/**",
                                        "/api/admin/secure/**",
                                        "/api/merchant/secure/**",
                                        "/api/merchantApplications/secure/**")
                                .authenticated())
                // Configure OAuth2 resource server
                .oauth2ResourceServer()
                .jwt();

        // Add CORS filters to enable cross-origin requests
        http.cors();

        // Add a content negotiation strategy to determine the response format
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Configure Okta to return a friendly error response for 401 unauthorized requests
        Okta.configureResourceServer401ResponseBody(http);

        // Build and return the SecurityFilterChain instance
        return http.build();
    }

}