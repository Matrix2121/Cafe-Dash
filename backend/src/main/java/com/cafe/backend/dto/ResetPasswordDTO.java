package com.cafe.backend.dto;

/**
 * The {@code ResetPasswordDTO} is a Data Transfer Object used during the password reset process.
 *
 * <p>It contains the password reset token and the user's new password input, including a confirmation
 * to ensure correctness before updating the account credentials.</p>
 *
 * @param token            The unique token provided to the user for resetting their password.
 * @param newPassword      The new password entered by the user.
 * @param confirmPassword  A confirmation of the new password to verify it matches.
 *
 * @author — ZapryanZapryanov
 */
public record ResetPasswordDTO(
		String token,
		String newPassword,
		String confirmPassword
) {}