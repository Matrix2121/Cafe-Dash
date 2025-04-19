package com.cafe.backend.service.impl;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.passwordReset.PasswordResetToken;
import com.cafe.backend.repository.PasswordResetTokenRepository;
import com.cafe.backend.service.PasswordResetService;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    private final int EXPIRATION_MINUTES = 30;

    public void createPasswordResetTokenForUser(UserEntity user, String token) {
        PasswordResetToken myToken = new PasswordResetToken();
        myToken.setToken(token);
        myToken.setUser(user);
        myToken.setExpiryDate(calculateExpiryDate(EXPIRATION_MINUTES));
        tokenRepository.save(myToken);
    }
    
    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return cal.getTime();
    }

    @Override
    public boolean validatePasswordResetToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        if (passToken == null) {
            return false;
        }
        return passToken.getExpiryDate().after(new Date());
    }

    @Override
    public UserEntity getUserByToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        return (passToken != null) ? passToken.getUser() : null;
    }

    @Override
    public void deleteToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        if (passToken != null) {
            tokenRepository.delete(passToken);
        }
    }
}

