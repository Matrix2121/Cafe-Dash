package com.cafe.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cafe.backend.service.EmailService;

/**
 * The {@code EmailServiceImpl} class provides the implementation of the {@link EmailService}
 * interface using Spring's {@link JavaMailSender} to send plain text email messages.
 *
 * <p>It is currently used to send password reset emails containing secure reset links to users.
 * The reset link typically expires after a predefined time window (e.g., 30 minutes).</p>
 *
 * <p>This class is marked as a Spring {@code @Service} and relies on the configured
 * SMTP properties in the application configuration.</p>
 *
 * @see EmailService
 */
@Service
public class EmailServiceImpl implements EmailService {

    /**
     * Spring's mail sender used to dispatch emails via SMTP.
     */
    @Autowired
    private JavaMailSender mailSender;

    /**
     * Sends a password reset email containing a secure reset link.
     *
     * @param to         The recipient's email address.
     * @param resetLink  The unique password reset link to be included in the message body.
     */
    @Override
    public void sendPasswordResetEmail(String to, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dashcafe74@gmail.com");
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, please click the link below:\n"
                + resetLink + "\n You have 30 minutes before the link expires");
        mailSender.send(message);
    }
}