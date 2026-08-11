package com.nearmart.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // DTO Validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidation(
            MethodArgumentNotValidException ex){

        Map<String,String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {

            errors.put(error.getField(), error.getDefaultMessage());

        });

        return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);

    }

    // Resource Not Found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(

            ResourceNotFoundException ex,
            HttpServletRequest request){

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                request.getRequestURI()

        );

        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);

    }

    // Duplicate Resource
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(

            DuplicateResourceException ex,
            HttpServletRequest request){

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                "Conflict",
                ex.getMessage(),
                request.getRequestURI()

        );

        return new ResponseEntity<>(response,HttpStatus.CONFLICT);

    }

    // Bad Request
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(

            BadRequestException ex,
            HttpServletRequest request){

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                request.getRequestURI()

        );

        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);

    }

    // Stock Exception
    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<ErrorResponse> handleStock(

            InsufficientStockException ex,
            HttpServletRequest request){

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Insufficient Stock",
                ex.getMessage(),
                request.getRequestURI()

        );

        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);

    }

    // Unauthorized
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(

            UnauthorizedException ex,
            HttpServletRequest request){

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),
                HttpStatus.UNAUTHORIZED.value(),
                "Unauthorized",
                ex.getMessage(),
                request.getRequestURI()

        );

        return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);

    }

    // Generic Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(

            Exception ex,
            HttpServletRequest request){

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                ex.getMessage(),
                request.getRequestURI()

        );

        return new ResponseEntity<>(response,
                HttpStatus.INTERNAL_SERVER_ERROR);

    }

}