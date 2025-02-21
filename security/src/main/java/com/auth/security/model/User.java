package com.auth.security.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Entidad que representa un usuario en el sistema.
 */
@Getter
@Setter
@Entity
public class User {

    /**
     * Identificador único del usuario.
     * Generado automáticamente por la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre de usuario.
     */
    private String username;

    /**
     * Correo electrónico del usuario.
     */
    private String email;

    /**
     * Contraseña del usuario.
     */
    private String password;

    /**
     * Token JWT del usuario.
     */
    private String token;

    /**
     * Rol del usuario.
     */
    private int role;

    /**
     * Estado del usuario.
     */
    private int status;

    /**
     * Fecha de creación del usuario.
     */
    private Date createdAt;
}