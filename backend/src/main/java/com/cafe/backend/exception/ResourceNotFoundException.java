package com.cafe.backend.exception;

/**
 * @author ZapryanZapryanov
 */

public class ResourceNotFoundException extends NotFoundException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable e) {
        super(message, e);
    }
}
