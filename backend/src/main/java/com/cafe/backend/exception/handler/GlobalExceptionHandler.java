//package com.cafe.backend.exception.handler;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import com.cafe.backend.exception.AuthenticationCustomException;
//import com.cafe.backend.exception.BadRequestException;
//import com.cafe.backend.exception.NotFoundException;
//
///**
// * @author ZapryanZapryanov
// */
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(BadRequestException.class)
//    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//    public String handleBadRequestException(BadRequestException ex) {
//        return ex.getMessage();
//    }
//
//    @ExceptionHandler(NotFoundException.class)
//    @ResponseStatus(value = HttpStatus.NOT_FOUND)
//    public String handleNotFoundException(NotFoundException ex) {
//        return ex.getMessage();
//    }
//    
//    @ExceptionHandler(AuthenticationCustomException.class)
//    @ResponseStatus(value = HttpStatus.FORBIDDEN)
//    public String handleNotFoundException(AuthenticationCustomException ex) {
//        return ex.getMessage();
//    }
//
//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//    public String handleGlobalException(Exception ex) {
//        return "An unexpected error occurred: " + ex.getMessage();
//    }
//}
