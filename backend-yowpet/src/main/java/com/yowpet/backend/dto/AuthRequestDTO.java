package com.yowpet.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthRequestDTO {
    private String firstName;
    private String lastName;
    private String username;

    @Email(message = "El correo electrónico debe ser válido")
    @Pattern(regexp = "^[\\w-.]+@[\\w-.]+\\.[a-z]{2,}$", message = "El correo electrónico debe ser válido")
    @Size(max = 50, message = "El correo electrónico no debe tener más de 50 caracteres")
    private String email;

    private String password;

    private String token;
}