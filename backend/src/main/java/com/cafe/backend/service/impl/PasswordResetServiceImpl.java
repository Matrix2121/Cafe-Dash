package com.cafe.backend.service.impl;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.passwordReset.PasswordResetToken;
import com.cafe.backend.repository.PasswordResetTokenRepository;
import com.cafe.backend.service.PasswordResetService;

/**
 * {@code PasswordResetServiceImpl} is a service class that implements {@link PasswordResetService}.
 * It provides methods to handle the generation, validation, retrieval, and deletion of password reset tokens.
 * <p>
 * This service class interacts with the {@code PasswordResetTokenRepository} to manage tokens for password resets,
 * including checking token expiration and associating tokens with users.
 * </p>
 *
 * @author ZapryanZapryanov
 */
@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    private final int EXPIRATION_MINUTES = 30;

    /**
     * Creates a new password reset token for the given user and stores it in the repository.
     *
     * @param user the {@code UserEntity} for which the password reset token is created.
     * @param token the reset token string.
     */
    public void createPasswordResetTokenForUser(UserEntity user, String token) {
        PasswordResetToken myToken = new PasswordResetToken();
        myToken.setToken(token);
        myToken.setUser(user);
        myToken.setExpiryDate(calculateExpiryDate(EXPIRATION_MINUTES));
        tokenRepository.save(myToken);
    }

    /**
     * Calculates the expiry date for the token based on the provided expiry time in minutes.
     *
     * @param expiryTimeInMinutes the number of minutes after which the token will expire.
     * @return the calculated expiry {@code Date}.
     */
    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return cal.getTime();
    }

    /**
     * Validates the provided password reset token.
     *
     * @param token the password reset token to validate.
     * @return {@code true} if the token is valid (i.e., not expired), {@code false} otherwise.
     */
    @Override
    public boolean validatePasswordResetToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        if (passToken == null) {
            return false;
        }
        return passToken.getExpiryDate().after(new Date());
    }

    /**
     * Retrieves the user associated with the provided password reset token.
     *
     * @param token the password reset token.
     * @return the {@code UserEntity} associated with the token, or {@code null} if the token is invalid.
     */
    @Override
    public UserEntity getUserByToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        return (passToken != null) ? passToken.getUser() : null;
    }

    /**
     * Deletes the password reset token from the repository.
     *
     * @param token the password reset token to delete.
     */
    @Override
    public void deleteToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        if (passToken != null) {
            tokenRepository.delete(passToken);
        }
    }
}