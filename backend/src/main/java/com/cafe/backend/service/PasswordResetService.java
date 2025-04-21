package com.cafe.backend.service;

import com.cafe.backend.entity.account.UserEntity;

/**
 * The {@code PasswordResetService} interface defines the contract for handling password reset functionality.
 *
 * <p>This includes generating and storing secure tokens, validating them during the reset process,
 * retrieving users by token, and deleting used or expired tokens.</p>
 *
 * <p>It is typically used in flows where users initiate a password reset via email.</p>
 *
 * @author — ZapryanZapryanov
 */
public interface PasswordResetService {

	/**
	 * Creates and stores a password reset token for a given user.
	 *
	 * @param user  The {@link UserEntity} for whom the token is being created.
	 * @param token A unique token string to associate with the user.
	 */
	void createPasswordResetTokenForUser(UserEntity user, String token);

	/**
	 * Validates the provided password reset token.
	 *
	 * @param token The token to validate.
	 * @return {@code true} if the token is valid and not expired; {@code false} otherwise.
	 */
	boolean validatePasswordResetToken(String token);

	/**
	 * Retrieves the user associated with the given reset token.
	 *
	 * @param token The reset token to search by.
	 * @return The {@link UserEntity} associated with the token, or {@code null} if not found.
	 */
	UserEntity getUserByToken(String token);

	/**
	 * Deletes the given token from storage after it has been used or invalidated.
	 *
	 * @param token The token to remove.
	 */
	void deleteToken(String token);
}