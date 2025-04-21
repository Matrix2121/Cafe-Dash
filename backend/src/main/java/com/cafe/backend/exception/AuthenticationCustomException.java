package com.cafe.backend.exception;

/**
 * The {@code AuthenticationCustomException} is a custom runtime exception used to
 * represent authentication-related errors within the application.
 *
 * <p>This exception is typically thrown when login credentials are invalid or when
 * authentication logic fails due to internal processing issues.</p>
 *
 * <p>It may be handled globally using a {@code @ControllerAdvice} to return a consistent
 * HTTP response to the client.</p>
 *
 * <p>Examples of usage include: failed login, token verification issues, or unauthorized access attempts.</p>
 *
 * @author ZapryanZapryanov
 */
public class AuthenticationCustomException extends RuntimeException {

	/**
	 * Constructs a new {@code AuthenticationCustomException} with the specified detail message.
	 *
	 * @param message The message describing the reason for the exception.
	 */
	public AuthenticationCustomException(String message) {
		super(message);
	}

	/**
	 * Constructs a new {@code AuthenticationCustomException} with the specified detail message and cause.
	 *
	 * @param message The message describing the reason for the exception.
	 * @param e       The underlying cause of the exception.
	 */
	public AuthenticationCustomException(String message, Throwable e) {
		super(message, e);
	}
}