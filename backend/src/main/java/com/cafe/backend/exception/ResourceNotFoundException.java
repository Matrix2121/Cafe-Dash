package com.cafe.backend.exception;

/**
 * The {@code ResourceNotFoundException} is a concrete subclass of {@link NotFoundException}
 * used to indicate that a generic resource was not found in the system.
 *
 * <p>This exception can be used when a specific resource type is not required, or when the
 * error context does not justify a more specialized exception like {@code UserNotFoundException}.</p>
 *
 * <p>It inherits the HTTP 404 status from its parent and can be caught or handled globally
 * for consistent API responses.</p>
 *
 * <p>Common usage includes missing entities, invalid lookup results, or deleted records.</p>
 *
 * @author ZapryanZapryanov
 */
public class ResourceNotFoundException extends NotFoundException {

    /**
     * Constructs a new {@code ResourceNotFoundException} with a detailed message.
     *
     * @param message A descriptive message explaining what resource was not found.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code ResourceNotFoundException} with a message and cause.
     *
     * @param message A descriptive message explaining the error context.
     * @param e       The underlying cause of the exception.
     */
    public ResourceNotFoundException(String message, Throwable e) {
        super(message, e);
    }
}