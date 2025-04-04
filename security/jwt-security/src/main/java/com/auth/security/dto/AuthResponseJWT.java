package com.auth.security.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Clase que representa la respuesta de autenticación.
 */
@Setter
@Getter
@NoArgsConstructor
public class AuthResponseJWT {

    /**
     * Token JWT generado tras la autenticación.
     */
    private String token;
}