package com.auth.security.controller;

import com.auth.security.dto.AuthLoginRequestDTO;
import com.auth.security.dto.AuthRegisterRequestDTO;
import com.auth.security.dto.AuthRegisterResponseDTO;
import com.auth.security.service.AuthServiceJWT;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador para manejar las solicitudes de autenticación.
 */
@RestController
@RequestMapping("/auth")
public class AuthControllerJWT {
    private final AuthServiceJWT authServiceJWT;

    /**
     * Constructor de AuthController.
     *
     * @param authServiceJWT el servicio de autenticación
     */
    @Autowired
    public AuthControllerJWT(AuthServiceJWT authServiceJWT) {
        this.authServiceJWT = authServiceJWT;
    }

    /**
     * Endpoint para obtener un mensaje del estado del proyecto.
     *
     * @return una respuesta HTTP con un mensaje del estado del proyecto.
     */
    @GetMapping("/hello")
    public ResponseEntity<String> getHello() {
        return authServiceJWT.getHello();
    }

    /**
     * Endpoint para iniciar sesión.
     *
     * @param authLoginRequestDTO la solicitud de autenticación
     * @return una respuesta HTTP con el resultado del inicio de sesión
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthLoginRequestDTO authLoginRequestDTO) {
        return authServiceJWT.login(authLoginRequestDTO);
    }

    /**
     * Endpoint para registrar un nuevo usuario.
     *
     * @param authRegisterRequestDTO la solicitud de registro
     * @return una respuesta HTTP con el resultado del registro
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRegisterRequestDTO authRegisterRequestDTO) {
        return authServiceJWT.register(authRegisterRequestDTO);
    }
}