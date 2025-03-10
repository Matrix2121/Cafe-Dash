package com.cafe.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class DataMappingException extends BadRequestException {

	public DataMappingException(String message) {
		super(message);
	}

	public DataMappingException(String message, Throwable e) {
        super(message, e);
    }
}
