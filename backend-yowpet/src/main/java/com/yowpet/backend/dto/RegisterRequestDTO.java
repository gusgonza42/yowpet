package com.yowpet.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    @NotBlank( message = "El username de usuario es obligatorio" )
    private String username;

    @NotBlank( message = "El correo electrónico es obligatorio" )
    @Email( message = "El correo electrónico no es válido" )
    private String email;

    @NotBlank( message = "La contraseña es obligatoria" )
    @Size( min = 6, message = "La contraseña debe tener al menos 6 caracteres" )
    private String password;

    @NotBlank( message = "El nombre es obligatorio" )
    private String firstName;

    @NotBlank( message = "El apellido es obligatorio" )
    private String lastName;
}
