package com.cafe.backend.service;

/**
 * The {@code EmailService} interface defines the contract for sending email notifications.
 *
 * <p>It is primarily used to send password reset links or other system-generated emails
 * to users of the application.</p>
 *
 * <p>Implementations of this interface can use SMTP, third-party email APIs, or mock frameworks
 * depending on the environment (production, testing, etc.).</p>
 *
 * @author — ZapryanZapryanov
 */
public interface EmailService {

	/**
	 * Sends a password reset email to the specified recipient.
	 *
	 * @param to         The recipient's email address.
	 * @param resetLink  The full URL containing the reset token.
	 */
	void sendPasswordResetEmail(String to, String resetLink);
}