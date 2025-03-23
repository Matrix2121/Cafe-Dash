package com.cafe.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public abstract class BadRequestException extends Exception {
	public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable e) {
        super(message, e);
    }
}
