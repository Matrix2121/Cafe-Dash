package com.cafe.backend.exception;

public class ResourceNotFoundException extends NotFoundException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable e) {
        super(message, e);
    }
}
