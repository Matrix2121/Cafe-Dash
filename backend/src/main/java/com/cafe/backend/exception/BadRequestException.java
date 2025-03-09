package com.cafe.backend.exception;

public abstract class BadRequestException extends Exception {
	public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable e) {
        super(message, e);
    }
}
