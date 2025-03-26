package com.cafe.backend.exception;

// errors with login
public class AuthenticationCustomException extends RuntimeException{

	public AuthenticationCustomException(String message) {
		super(message);
	}
	
	public AuthenticationCustomException(String message, Throwable e) {
		super(message, e);
	}
	
}
