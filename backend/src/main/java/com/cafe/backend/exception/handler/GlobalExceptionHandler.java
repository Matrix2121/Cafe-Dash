package com.cafe.backend.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cafe.backend.exception.AuthenticationCustomException;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

import java.util.ConcurrentModificationException;

/**
 * {@code GlobalExceptionHandler} is a global exception handler for handling various types of exceptions thrown in the application.
 * It is annotated with {@code @RestControllerAdvice} to handle exceptions globally for RESTful controllers.
 * <p>
 * This class provides methods to handle different types of exceptions and return appropriate HTTP responses with relevant status codes:
 * - {@code BadRequestException}: Responds with HTTP 400 (Bad Request).
 * - {@code NotFoundException}: Responds with HTTP 404 (Not Found).
 * - {@code AuthenticationCustomException}: Responds with HTTP 403 (Forbidden).
 * - {@code ConcurrentModificationException}: Responds with HTTP 500 (Internal Server Error).
 * - {@code Exception}: Catches all other exceptions and responds with HTTP 500 (Internal Server Error).
 * </p>
 *
 * @author ZapryanZapryanov
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles {@code BadRequestException} and returns a response with HTTP 400 status.
     *
     * @param ex the exception to handle.
     * @return the exception message.
     */
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public String handleBadRequestException(BadRequestException ex) {
        return ex.getMessage();
    }

    /**
     * Handles {@code NotFoundException} and returns a response with HTTP 404 status.
     *
     * @param ex the exception to handle.
     * @return the exception message.
     */
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public String handleNotFoundException(NotFoundException ex) {
        return ex.getMessage();
    }

    /**
     * Handles {@code AuthenticationCustomException} and returns a response with HTTP 403 status.
     *
     * @param ex the exception to handle.
     * @return the exception message.
     */
    @ExceptionHandler(AuthenticationCustomException.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public String handleNotFoundException(AuthenticationCustomException ex) {
        return ex.getMessage();
    }

    /**
     * Handles {@code ConcurrentModificationException} and returns a response with HTTP 500 status.
     *
     * @param ex the exception to handle.
     * @return the exception message.
     */
    @ExceptionHandler(ConcurrentModificationException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleConcurrentModificationException(ConcurrentModificationException ex) {
        return ex.getMessage();
    }

    /**
     * Handles generic {@code Exception} and returns a response with HTTP 500 status.
     *
     * @param ex the exception to handle.
     * @return a generic error message indicating an unexpected error.
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleGlobalException(Exception ex) {
        return "An unexpected error occurred: " + ex.getMessage();
    }
}