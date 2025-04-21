package com.cafe.backend.exception;

/**
 * {@code UserAlreadyExistsException} is a custom exception class that extends {@code BadRequestException}.
 * It is used to represent an error that occurs when an attempt is made to create a user that already exists in the system.
 * <p>
 * This exception can be thrown during user creation or registration when the provided username or email already exists in the system.
 * </p>
 *
 * @author ZapryanZapryanov
 */
public class UserAlreadyExistsException extends BadRequestException {

	/**
	 * Constructs a new {@code UserAlreadyExistsException} with the specified detail message.
	 *
	 * @param message the detail message that explains the cause of the exception.
	 */
	public UserAlreadyExistsException(String message) {
		super(message);
	}
}