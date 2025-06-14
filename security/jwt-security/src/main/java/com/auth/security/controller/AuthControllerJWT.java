package com.auth.security.controller;

import com.auth.security.dto.AuthRequestJWT;
import com.auth.security.service.AuthServiceJWT;
import com.auth.security.util.JwtTokenUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/**
 * Controlador para manejar las solicitudes de autenticación.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthControllerJWT {
    private final AuthServiceJWT authServiceJWT;
    private final JwtTokenUtils jwtTokenUtils;


    /**
     * Constructor de AuthController.
     *
     * @param authServiceJWT el servicio de autenticación
     */
    @Autowired
    public AuthControllerJWT(AuthServiceJWT authServiceJWT, JwtTokenUtils jwtTokenUtils) {
        this.authServiceJWT = authServiceJWT;
        this.jwtTokenUtils = jwtTokenUtils;
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
     * @param authRequestJWT la solicitud de autenticación
     * @return una respuesta HTTP con el resultado del inicio de sesión
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequestJWT authRequestJWT) {
        return authServiceJWT.login(authRequestJWT);
    }

    /**
     * Endpoint para registrar un nuevo usuario.
     *
     * @param authRequestJWT la solicitud de registro
     * @return una respuesta HTTP con el resultado del registro
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequestJWT authRequestJWT) {
        return authServiceJWT.register(authRequestJWT);
    }

    /**
     * Endpoint para validar un token JWT.
     *
     * @param token el token JWT a validar
     * @return true si el token es válido, false en caso contrario
     */
    @PostMapping("/validation")
    public ResponseEntity<Boolean> validateToken(@RequestBody String token) {
        return authServiceJWT.validateToken(token);
    }

    @GetMapping("/extract-userid")
    public ResponseEntity<Integer> extractUserId(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7); // Elimina "Bearer "
            int userId = jwtTokenUtils.extractUserId(jwt);
            return ResponseEntity.ok(userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}