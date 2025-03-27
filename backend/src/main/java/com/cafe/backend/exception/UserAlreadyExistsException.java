package com.cafe.backend.exception;

/**
 * @author ZapryanZapryanov
 */

public class UserAlreadyExistsException extends BadRequestException {

	public UserAlreadyExistsException(String message) {
		super(message);
	}

}
