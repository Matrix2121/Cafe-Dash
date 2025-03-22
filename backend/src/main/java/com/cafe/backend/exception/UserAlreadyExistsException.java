package com.cafe.backend.exception;

public class UserAlreadyExistsException extends BadRequestException {

	public UserAlreadyExistsException(String message) {
		super(message);
	}

}
