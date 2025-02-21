package com.auth.security.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Clase que representa una solicitud de autenticación.
 */
@Getter
@Setter
@NoArgsConstructor
public class AuthRequestDTO {

    /**
     * Nombre de usuario para la autenticación.
     */
    private String username;

    /**
     * Correo electrónico del usuario.
     * Debe ser un correo electrónico válido y no debe tener más de 50 caracteres.
     */
    @Email( message = "El correo electrónico debe ser válido" )
    @Pattern( regexp = "^[\\w-.]+@[\\w-.]+\\.[a-z]{2,}$", message = "El correo electrónico debe ser válido" )
    @Size( max = 50, message = "El correo electrónico no debe tener más de 50 caracteres" )
    private String email;

    /**
     * Contraseña del usuario.
     * Este campo es obligatorio.
     */
    @NotBlank( message = "La contraseña es obligatoria" )
    private String password;
}