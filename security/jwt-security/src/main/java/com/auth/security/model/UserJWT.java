package com.auth.security.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Entidad que representa un usuario en el sistema.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserJWT {
    public static final int status_active = 1;
    public static final int role_user = 2;

    private int id;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String password;

    private String city = "No especificado";

    private String address = "No especificado";

    private Integer status = status_active;

    private String phonenumber = "";

    private Integer zipCode = 0;

    private String gender = "";

    private String profilePicture = "No especificado";

    private Integer role = role_user;

    private Date birthDate = null;

    private String languages ;

    private String paymentMethod;

    private String token = "No especificado";

    private Date createdAt;

    private Date updatedAt = null;

    private Date deletedAt = null;

    @PrePersist
    protected void onCreate( ) {
        if ( createdAt == null ) {
            createdAt = new Date( );
        }
    }
}