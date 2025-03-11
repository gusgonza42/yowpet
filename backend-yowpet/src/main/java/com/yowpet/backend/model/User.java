package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {
    public static int status_active = 1;
    public static int status_inactive = 0;
    public static int role_admin = 0;
    public static int role_caregiver = 1;
    public static int role_user = 2;

    private int id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String city;

    private String address;

    private int status = status_active;

    private int phoneNumber;

    private int zipCode;

    private String gender;

    private String profilePicture;

    private int role = role_user;

    private Date birthDate;

    private String languages;

    private String paymentMethod;

    private Date createdAt;

    private Date updatedAt;

    private Date deletedAt;

    /**
     * Establece la fecha de registro al crear el objeto usuario.
     */
    @PrePersist
    protected void onCreate( ) {
        if( createdAt == null ) {
            createdAt = new Date( );
        }
    }

    /**
     * Constructor para crear un nuevo usuario con el nombre, apellido, correo electrónico y contraseña especificados.
     *
     * @param firstName el nombre del usuario
     * @param lastName  el apellido del usuario
     * @param email     el correo electrónico del usuario
     * @param password  la contraseña del usuario
     */
    public User( String firstName, String lastName, String email, String password ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}