package com.cafe.backend.service;

import com.cafe.backend.entity.account.UserEntity;

public interface PasswordResetService {
	void createPasswordResetTokenForUser(UserEntity user, String token);
	boolean validatePasswordResetToken(String token);
	UserEntity getUserByToken(String token);
	void deleteToken(String token);
}
