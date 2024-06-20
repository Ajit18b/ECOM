package com.Ecom.demoEcommerceWeb.Controller;

// Importing necessary services, utility classes, entities, and request models
import com.Ecom.demoEcommerceWeb.Service.MessagesService;
import com.Ecom.demoEcommerceWeb.Utils.ExtractJWT;
import com.Ecom.demoEcommerceWeb.entity.Message;
import com.Ecom.demoEcommerceWeb.requestmodels.AdminQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for message-related operations.
 */
@CrossOrigin("http://localhost:3000") // enable CORS for requests from localhost:3000
@RestController
@RequestMapping("/api/messages") // base URL for message-related endpoints
public class MessagesController {

    // Private field for the MessagesService instance
    private MessagesService messagesService;

    /**
     * Constructor to inject the MessagesService instance.
     *
     * @param messagesService the MessagesService instance
     */
    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    /**
     * Endpoint to post a new message.
     *
     * @param token the JWT token in the Authorization header
     * @param messageRequest the request body containing message details
     */
    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token,
                            @RequestBody Message messageRequest) {
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Call the MessagesService method to post the message
        messagesService.postMessage(messageRequest, userEmail);
    }

    /**
     * Endpoint for an admin to respond to a message.
     *
     * @param token the JWT token in the Authorization header
     * @param adminQuestionRequest the request body containing response details
     * @throws Exception if the user is not an admin or if an error occurs
     */
    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        // Extract the user's email from the JWT token
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        // Extract the user type from the JWT token
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        // Check if the user is an admin
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        // Call the MessagesService method to respond to the message
        messagesService.putMessage(adminQuestionRequest, userEmail);
    }
}