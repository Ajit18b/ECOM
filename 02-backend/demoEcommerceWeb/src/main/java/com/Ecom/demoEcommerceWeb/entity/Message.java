package com.Ecom.demoEcommerceWeb.entity;

// Importing necessary annotations and Lombok's @Data
import lombok.Data;

import javax.persistence.*;

/**
 * Entity class representing a message in the e-commerce system.
 */
@Entity
@Table(name = "messages")
@Data
public class Message {

    /**
     * No-argument constructor for Message entity.
     */
    public Message(){}

    /**
     * Constructor for Message entity with title and question.
     *
     * @param title the title of the message
     * @param question the question or content of the message
     */
    public Message(String title, String question) {
        this.title = title;
        this.question = question;
    }

    /**
     * Unique identifier for the message.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    /**
     * Email of the user who sent the message.
     */
    @Column(name="user_email")
    private String userEmail;

    /**
     * Title of the message.
     */
    @Column(name="title")
    private String title;

    /**
     * Content or question of the message.
     */
    @Column(name="question")
    private String question;

    /**
     * Email of the admin who responded to the message.
     */
    @Column(name="admin_email")
    private String adminEmail;

    /**
     * Response to the message.
     */
    @Column(name="response")
    private String response;

    /**
     * Status indicating whether the message is closed or not.
     */
    @Column(name="closed")
    private boolean closed;
}