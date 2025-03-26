package com.cafe.backend.exception;

/**
 * @author ZapryanZapryanov
 */

public abstract class BadRequestException extends Exception {
	public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable e) {
        super(message, e);
    }
}
