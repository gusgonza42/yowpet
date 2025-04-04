package com.auth.security.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import jakarta.validation.constraints.Email;

/**
 * Clase que representa una solicitud de autenticación.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthRequestJWT {

    private String firstName;

    private String lastName;

    /**
     * Nombre de usuario para la autenticación.
     * Ya no es obligatorio para permitir login con email.
     */
    private String username;

    /**
     * Correo electrónico del usuario.
     * Debe ser un correo electrónico válido y no debe tener más de 50 caracteres.
     * Ya no es obligatorio para permitir login con username.
     */
    @Email( message = "El correo electrónico debe ser válido" )
    @Pattern( regexp = "^[\\w-.]+@[\\w-.]+\\.[a-z]{2,}$", message = "El correo electrónico debe ser válido" )
    @Size( max = 50, message = "El correo electrónico no debe tener más de 50 caracteres" )
    private String email;

    /**
     * Contraseña del usuario.
     * Este campo es obligatorio.
     */
    private String password;
}