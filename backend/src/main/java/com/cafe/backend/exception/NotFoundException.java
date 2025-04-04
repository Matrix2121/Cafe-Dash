package com.cafe.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author ZapryanZapryanov
 */

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public abstract class NotFoundException extends Exception {
	public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable e) {
        super(message, e);
    }
}
