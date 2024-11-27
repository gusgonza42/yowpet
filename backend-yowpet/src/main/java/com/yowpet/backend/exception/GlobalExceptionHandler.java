package com.yowpet.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler ( NoHandlerFoundException.class )
    @ResponseStatus ( HttpStatus.NOT_FOUND )
    public ResponseEntity< Map< String, Object > > handleNotFound( NoHandlerFoundException ex ) {
        Map< String, Object > response = new HashMap<>( );
        response.put( "error", "Not Found" );
        response.put( "message", "The requested route does not exist or is invalid." );
        response.put( "status", HttpStatus.NOT_FOUND.value( ) );
        response.put( "timestamp", System.currentTimeMillis( ) );

        return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( response );
    }
}