package com.auth.security.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Clase GlobalExceptionHandler que maneja excepciones globales en la aplicación.
 * Utiliza @ControllerAdvice para permitir el manejo centralizado de excepciones.
 */
@ControllerAdvice
public class GlobalExceptionHandlerJWT {

    /**
     * Maneja excepciones de tipo MethodArgumentNotValidException.
     * Esta excepción se lanza cuando la validación de argumentos de método falla.
     *
     * @param ex la excepción MethodArgumentNotValidException que se ha lanzado
     */
    @ExceptionHandler( MethodArgumentNotValidException.class )
    public ResponseEntity< Map< String, String > > handleValidationExceptions( MethodArgumentNotValidException ex ) {
        Map< String, String > errors = new HashMap<>( );
        ex.getBindingResult( ).getAllErrors( ).forEach( ( error ) -> {
            String fieldName = ( ( FieldError ) error ).getField( );
            String errorMessage = error.getDefaultMessage( );
            errors.put( fieldName , errorMessage );
        } );
        return ResponseEntity.badRequest( ).body( errors );
    }
}