package com.cafe.backend.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.backend.dto.ResetPasswordDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.mapper.UpdateUserMapper;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.service.EmailService;
import com.cafe.backend.service.PasswordResetService;
import com.cafe.backend.service.UserService;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // temporary
    private static final String RESET_URL = "http://localhost:8081/resetpassword";

    @PostMapping("/resetToken/{email}")
    public ResponseEntity<String> forgotPassword(@PathVariable String email) throws BadRequestException, NotFoundException {
        UserEntity user = userService.getUserByEmail(email);
        if (user != null) {
            String token = UUID.randomUUID().toString();
            passwordResetService.createPasswordResetTokenForUser(user, token);
            String resetLink = RESET_URL + "?token=" + token;
            emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
        }
        else {
        	System.out.println("User not found");
        }
        // we return this always no matter if email exists in the database
        return ResponseEntity.ok("If an account with that email exists, you will receive a password reset link.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDTO request) throws DataMappingException, BadRequestException, NotFoundException {
        if (!passwordResetService.validatePasswordResetToken(request.token())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid or expired token.");
        }
        if (!request.newPassword().equals(request.confirmPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Passwords do not match.");
        }
        UserEntity user = passwordResetService.getUserByToken(request.token());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid or expired token.");
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userService.updateUser(user.getId(),UpdateUserMapper.mapToDTO(user));
        passwordResetService.deleteToken(request.token());
        return ResponseEntity.ok("Password has been reset successfully.");
    }
    
}

