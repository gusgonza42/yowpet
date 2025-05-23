package com.auth.security.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Punto de entrada de autenticación JWT.
 * Maneja los intentos de acceso no autorizados enviando un error 401 (Unauthorized).
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * Método que se invoca cuando un usuario no autenticado intenta acceder a un recurso protegido.
     *
     * @param request       la solicitud HTTP
     * @param response      la respuesta HTTP
     * @param authException la excepción de autenticación
     * @throws IOException sí ocurre un error de entrada/salida
     */
    @Override
    public void commence( HttpServletRequest request , HttpServletResponse response , AuthenticationException authException )
            throws IOException {
        response.sendError( HttpServletResponse.SC_UNAUTHORIZED , "Unauthorized: Authentication token was either missing or invalid." );
    }
}