package com.cafe.backend.exception;

/**
 * {@code BadRequestException} is a custom exception class used to represent a bad request error.
 * It extends the {@code Exception} class and is used to signal that a request made to the system is invalid.
 * <p>
 * This exception can be thrown when a client makes a request that cannot be processed due to incorrect or invalid data.
 * </p>
 *
 * @author ZapryanZapryanov
 */
public class BadRequestException extends Exception {

    /**
     * Constructs a new {@code BadRequestException} with the specified detail message.
     *
     * @param message the detail message that explains the cause of the exception.
     */
    public BadRequestException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code BadRequestException} with the specified detail message and cause.
     *
     * @param message the detail message that explains the cause of the exception.
     * @param e the cause of the exception (which is saved for later retrieval by the {@link #getCause()} method).
     */
    public BadRequestException(String message, Throwable e) {
        super(message, e);
    }
}