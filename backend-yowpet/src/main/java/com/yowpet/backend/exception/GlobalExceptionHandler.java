package com.yowpet.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for the application.
 * Handles specific errors in a centralized way.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles the NoHandlerFoundException.
     *
     * @param ex the NoHandlerFoundException thrown when no handler is found for a request.
     * @return a ResponseEntity with error details, and an HTTP 404 (Not Found) status.
     */
    @ExceptionHandler ( NoHandlerFoundException.class )
    @ResponseStatus ( HttpStatus.NOT_FOUND )
    public ResponseEntity< Map< String, Object > > handleNotFound( NoHandlerFoundException ex ) {
        Map< String, Object > response = new HashMap<>( );
        response.put( "error", "Not Found" ); // The error name
        response.put( "message", "The requested route does not exist or is invalid." ); // Message about the error
        response.put( "status", HttpStatus.NOT_FOUND.value( ) ); // HTTP 404 code
        response.put( "timestamp", System.currentTimeMillis( ) ); // Time of the error

        return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( response ); // Return response with 404 status
    }
}