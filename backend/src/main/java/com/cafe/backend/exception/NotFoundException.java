package com.cafe.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The {@code NotFoundException} is an abstract base class used for defining
 * custom exceptions when a requested resource is not found.
 *
 * <p>It is annotated with {@link ResponseStatus} to automatically return
 * an HTTP 404 (Not Found) response when thrown in a controller.</p>
 *
 * <p>Concrete subclasses can be used to provide context-specific not-found errors,
 * such as {@code UserNotFoundException}, {@code OrderNotFoundException}, etc.</p>
 *
 * @author ZapryanZapryanov
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public abstract class NotFoundException extends Exception {

    /**
     * Constructs a new {@code NotFoundException} with the specified detail message.
     *
     * @param message A descriptive message explaining what was not found.
     */
    public NotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code NotFoundException} with the specified detail message and cause.
     *
     * @param message A descriptive message explaining what was not found.
     * @param e       The cause of the exception.
     */
    public NotFoundException(String message, Throwable e) {
        super(message, e);
    }
}