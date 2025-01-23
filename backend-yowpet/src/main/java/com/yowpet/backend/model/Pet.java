package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Represents a pet entity in the system.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "pet" )
public class Pet {
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_INACTIVE = 0;

    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "id" )
    private Long id;

    @Column ( name = "animalId" )
    private String animalId;

    @ManyToOne
    @JoinColumn ( name = "ownerId", referencedColumnName = "id" )
    private User ownerId;

    @ManyToOne
    @JoinColumn ( name = "breedId", referencedColumnName = "id" )
    private Breed breed;

    @ManyToMany
    @JoinTable ( name = "pet_allergies", joinColumns = @JoinColumn ( name = "pet_id" ), inverseJoinColumns = @JoinColumn ( name = "allergy_id" ) )
    private List< Allergy > allergies;

    @Column ( name = "status" )
    private int status = STATUS_ACTIVE;

    @Column ( name = "name", nullable = false )
    private String name;

    @Temporal ( TemporalType.DATE )
    @Column ( name = "birthDate" )
    private Date birthDate;

    @Column ( name = "gender", nullable = false )
    private String gender;

    @Column ( name = "sterilized", nullable = false )
    private int sterilized;

    @Column ( name = "profilePicture" )
    private String profilePicture;

    @Column ( name = "description" )
    private String description;

    @Column ( name = "emergencyContact" )
    private String emergencyContact;

    @Column ( name = "createdAt" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date createdAt;

    @Column ( name = "updatedAt" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date updatedAt;

    @Column ( name = "deletedAt" )
    @Temporal ( TemporalType.TIMESTAMP )
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

    @Override
    public boolean equals( Object o ) {
        if( this == o )
            return true;
        if( ! ( o instanceof Pet ) )
            return false;
        Pet pet = ( Pet ) o;
        return Objects.equals( id, pet.id );
    }

    @Override
    public int hashCode( ) {
        return Objects.hash( id );
    }
}