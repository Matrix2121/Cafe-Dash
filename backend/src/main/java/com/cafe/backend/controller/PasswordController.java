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

/**
 * The {@code PasswordController} provides RESTful endpoints for password reset functionality.
 *
 * <p>This controller supports initiating a password reset by sending an email with a secure token,
 * and completing the reset by submitting a new password using that token.</p>
 *
 * <p>It interacts with the {@link UserService}, {@link PasswordResetService}, {@link EmailService},
 * and uses a {@link PasswordEncoder} for secure password hashing.</p>
 *
 * <p>The password reset flow is secure and ensures that the user is authenticated via a temporary token sent via email.</p>
 *
 * @author — ZapryanZapryanov
 */
@RestController
@RequestMapping("/api/password")
public class PasswordController {

    /**
     * Service for managing user data.
     */
    @Autowired
    private UserService userService;

    /**
     * Service responsible for generating, validating, and deleting password reset tokens.
     */
    @Autowired
    private PasswordResetService passwordResetService;

    /**
     * Service used to send password reset emails to users.
     */
    @Autowired
    private EmailService emailService;

    /**
     * Encoder used to hash new passwords before saving them.
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Temporary URL used in the reset link sent via email.
     */
    private static final String RESET_URL = "http://localhost:8081/resetpassword";

    /**
     * Generates a password reset token and sends it via email to the specified user.
     *
     * @param email The email address of the user requesting password reset.
     * @return A generic success message regardless of whether the email exists.
     * @throws BadRequestException if the request is malformed.
     * @throws NotFoundException if the user is not found (internally handled).
     */
    @PostMapping("/resetToken/{email}")
    public ResponseEntity<String> forgotPassword(@PathVariable String email) throws BadRequestException, NotFoundException {
        UserEntity user = userService.getUserByEmail(email);
        if (user != null) {
            String token = UUID.randomUUID().toString();
            passwordResetService.createPasswordResetTokenForUser(user, token);
            String resetLink = RESET_URL + "?token=" + token;
            emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
        } else {
            System.out.println("User not found");
        }
        return ResponseEntity.ok("If an account with that email exists, you will receive a password reset link.");
    }

    /**
     * Resets the user's password using a token and new password values.
     *
     * @param request A {@link ResetPasswordDTO} containing the token, new password, and confirmation.
     * @return A {@link ResponseEntity} with the outcome of the operation.
     * @throws DataMappingException if the DTO mapping fails.
     * @throws BadRequestException if validation fails (e.g. mismatched passwords).
     * @throws NotFoundException if the user is not found for the token.
     */
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
        userService.updateUser(user.getId(), UpdateUserMapper.mapToDTO(user));
        passwordResetService.deleteToken(request.token());

        return ResponseEntity.ok("Password has been reset successfully.");
    }
}