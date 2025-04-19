package com.cafe.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cafe.backend.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendPasswordResetEmail(String to, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dashcafe74@gmail.com");
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, please click the link below:\n" + resetLink + "\n You have 30 minutes before the link expires");
        mailSender.send(message);
    }
}

