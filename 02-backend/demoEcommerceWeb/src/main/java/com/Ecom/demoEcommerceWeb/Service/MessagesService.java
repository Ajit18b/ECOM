package com.Ecom.demoEcommerceWeb.Service;

// Importing necessary dependencies
import com.Ecom.demoEcommerceWeb.dao.MessageRepository;
import com.Ecom.demoEcommerceWeb.entity.Message;
import com.Ecom.demoEcommerceWeb.requestmodels.AdminQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service class for message-related operations.
 */
@Service
@Transactional
public class MessagesService {

    /**
     * Repository for message-related operations.
     */
    private MessageRepository messageRepository;

    /**
     * Constructor to initialize the service with the message repository.
     *
     * @param messageRepository The repository for message-related operations.
     */
    @Autowired
    public MessagesService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    /**
     * Creates a new message based on the provided request.
     *
     * @param messageRequest The request containing message details.
     * @param userEmail      The email of the user sending the message.
     */
    public void postMessage(Message messageRequest, String userEmail) {
        // Create a new message entity
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        // Set the user email
        message.setUserEmail(userEmail);
        // Save the new message
        messageRepository.save(message);
    }

    /**
     * Updates a message with an admin response.
     *
     * @param adminQuestionRequest The request containing the admin response.
     * @param userEmail           The email of the admin responding to the message.
     * @throws Exception If the message is not found.
     */
    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws Exception {
        // Find the message by ID
        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());
        if (!message.isPresent()) {
            throw new Exception("Message not found");
        }

        // Update the message with the admin response
        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);
        // Save the updated message
        messageRepository.save(message.get());
    }
}