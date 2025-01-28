package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

/**
 * Representa una entidad de mascota en el sistema.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "pet" )
public class Pet {
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_INACTIVE = 0;

    /**
     * El identificador único para la mascota.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "id" )
    private Long id;

    /**
     * La categoría del animal a la que pertenece la mascota.
     * Es una clave foránea que referencia a la entidad Animal_Category.
     */
    @ManyToOne
    @JoinColumn(name = "animal_category_id", referencedColumnName = "id")
    private Animal_Category animalCategory;

    /**
     * El propietario de la mascota.
     */
    @ManyToOne
    @JoinColumn ( name = "owner_id", referencedColumnName = "id" )
    private User ownerId;

    /**
     * La raza de la mascota.
     */
    @ManyToOne
    @JoinColumn ( name = "breed_id", referencedColumnName = "id" )
    private Breed breed;

    /**
     * Las alergias de la mascota.
     */
    @ManyToMany
    @JoinTable ( name = "pet_allergies", joinColumns = @JoinColumn ( name = "pet_id" ), inverseJoinColumns = @JoinColumn ( name = "allergy_id" ) )
    private List< Allergy > allergies;

    /**
     * El estado de la mascota.
     * Valor por defecto: 1 = activo, 0 = inactivo
     */
    @Column ( name = "status" )
    private int status = STATUS_ACTIVE;

    /**
     * El nombre de la mascota.
     */
    @Column ( name = "name", nullable = false )
    private String name;

    /**
     * La fecha de nacimiento de la mascota.
     */
    @Temporal ( TemporalType.DATE )
    @Column ( name = "birth_date" )
    private Date birthDate;

    /**
     * El género de la mascota.
     */
    @Column ( name = "gender", nullable = false )
    private String gender;

    /**
     * Indica si la mascota está esterilizada.
     */
    @Column ( name = "sterilized", nullable = false )
    private int sterilized;

    /**
     * La foto de perfil de la mascota.
     */
    @Column ( name = "profile_picture" )
    private String profilePicture;

    /**
     * La descripción de la mascota.
     */
    @Column ( name = "description" )
    private String description;

    /**
     * El contacto de emergencia de la mascota.
     */
    @Column ( name = "emergency_contact" )
    private String emergencyContact;

    /**
     * La fecha de creación de la mascota.
     */
    @Column ( name = "created_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date createdAt;

    /**
     * La fecha de última actualización de la mascota.
     */
    @Column ( name = "updated_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date updatedAt;

    /**
     * La fecha de eliminación de la mascota.
     */
    @Column ( name = "deleted_at" )
    @Temporal ( TemporalType.TIMESTAMP )
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