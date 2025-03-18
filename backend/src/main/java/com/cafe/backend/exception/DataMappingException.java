package com.cafe.backend.exception;

public class DataMappingException extends BadRequestException {

	public DataMappingException(String message) {
		super(message);
	}

	public DataMappingException(String message, Throwable e) {
        super(message, e);
    }
}
