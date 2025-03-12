package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

/**
 * Representa una entidad de mascota en el sistema.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Pet {
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_INACTIVE = 0;

    /**
     * El identificador único para la mascota.
     */
    private int id;

    /**
     * La categoría del animal a la que pertenece la mascota.
     * Es una clave foránea que referencia a la entidad AnimalCategory.
     */
    private int animalCategory;

    /**
     * El propietario de la mascota.
     */
    private int ownerId;

    /**
     * La raza de la mascota.
     */
    private int breed;

    /**
     * El estado de la mascota.
     * Valor por defecto: 1 = activo, 0 = inactivo
     */
    private int status = STATUS_ACTIVE;

    /**
     * El nombre de la mascota.
     */
    private String name;

    /**
     * La fecha de nacimiento de la mascota.
     */
    private Date birthDate;

    /**
     * El género de la mascota.
     */
    private String gender;

    /**
     * Indica si la mascota está esterilizada.
     */
    private int sterilized;

    /**
     * La foto de perfil de la mascota.
     */
    private String profilePicture;

    /**
     * La descripción de la mascota.
     */
    private String description;

    /**
     * El contacto de emergencia de la mascota.
     */
    private String emergencyContact;

    /**
     * La fecha de creación de la mascota.
     */
    private Date createdAt;

    /**
     * La fecha de última actualización de la mascota.
     */
    private Date updatedAt;

    /**
     * La fecha de eliminación de la mascota.
     */
    private Date deletedAt;

    /**
     * Establece la fecha de registro al crear el objeto mascota.
     */
    @PrePersist
    protected void onCreate( ) {
        if( createdAt == null ) {
            createdAt = new Date( );
        }
    }


}