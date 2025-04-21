package com.cafe.backend.exception;

/**
 * {@code DataMappingException} is a custom exception class that extends {@code BadRequestException}.
 * It is used to represent errors occurring during data mapping operations.
 * <p>
 * This exception can be thrown when there are issues in converting data between different formats (such as entity to DTO).
 * </p>
 *
 * @author ZapryanZapryanov
 */
public class DataMappingException extends BadRequestException {

	/**
	 * Constructs a new {@code DataMappingException} with the specified detail message.
	 *
	 * @param message the detail message that explains the cause of the exception.
	 */
	public DataMappingException(String message) {
		super(message);
	}

	/**
	 * Constructs a new {@code DataMappingException} with the specified detail message and cause.
	 *
	 * @param message the detail message that explains the cause of the exception.
	 * @param e the cause of the exception (which is saved for later retrieval by the {@link #getCause()} method).
	 */
	public DataMappingException(String message, Throwable e) {
		super(message, e);
	}
}