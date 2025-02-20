package com.auth.security.controller;

import com.auth.security.dto.AuthRequest;
import com.auth.security.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador para manejar las solicitudes de autenticación.
 */
@RestController
@RequestMapping( "/auth" )
public class AuthController {
    private final AuthService authService;

    /**
     * Constructor de AuthController.
     *
     * @param authService el servicio de autenticación
     */
    @Autowired
    public AuthController( AuthService authService ) {
        this.authService = authService;
    }

    /**
     * Endpoint para obtener un mensaje del estado del proyecto.
     *
     * @return una respuesta HTTP con un mensaje del estado del proyecto.
     */
    @GetMapping( "/hello" )
    public ResponseEntity< String > getHello( ) {
        return authService.getHello( );
    }

    /**
     * Endpoint para iniciar sesión.
     *
     * @param authRequest la solicitud de autenticación
     * @return una respuesta HTTP con el resultado del inicio de sesión
     */
    @PostMapping( "/login" )
    public ResponseEntity< ? > login( @Valid @RequestBody AuthRequest authRequest ) {
        return authService.login( authRequest );
    }

    /**
     * Endpoint para registrar un nuevo usuario.
     *
     * @param authRequest la solicitud de registro
     * @return una respuesta HTTP con el resultado del registro
     */
    @PostMapping( "/register" )
    public ResponseEntity< ? > register( @Valid @RequestBody AuthRequest authRequest ) {
        return authService.register( authRequest );
    }
}