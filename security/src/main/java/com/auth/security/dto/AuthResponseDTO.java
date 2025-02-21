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
public class AuthResponseDTO {

    /**
     * Token JWT generado tras la autenticación.
     */
    private String token;

    /**
     * Constructor de la clase AuthResponse.
     *
     * @param token el token JWT generado tras la autenticación
     */
    public AuthResponseDTO(String token ) {
        this.token = token;
    }
}