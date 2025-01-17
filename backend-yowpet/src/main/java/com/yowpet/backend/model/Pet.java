package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Representa una entidad de mascota en el sistema.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "pet" )
public class Pet {

    /**
     * El identificador único para la mascota.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "p_id" )
    private Long p_id;

    /**
     * El ID del animal de la mascota.
     */
    @Column ( name = "p_animal_id" )
    private String p_animal_id;

    /**
     * El propietario de la mascota.
     */
    @ManyToOne
    @JoinColumn ( name = "p_owner_id", referencedColumnName = "u_id" )
    private User p_owner;


    @ManyToMany
    @JoinTable ( name = "allergies",joinColumns = @JoinColumn(name = "pet_id"),inverseJoinColumns = @JoinColumn(name = "allergy_id"))
    private List<Allergy> allergies;

    /**
     * El estado de la mascota.
     * Valores por defecto: 1 = activo, 0 = inactivo.
     */
    @Column ( name = "p_status" )
    private int p_status = 1;

    /**
     * El nombre de la mascota.
     */
    @Column ( name = "p_name", nullable = false )
    private String p_name;

    /**
     * La fecha de nacimiento de la mascota.
     */
    @Column ( name = "p_birth_date" )
    @Temporal ( TemporalType.DATE )
    private Date p_birth_date;

    /**
     * El género de la mascota.
     */
    @Column ( name = "p_gender" )
    private String p_gender;

    /**
     * El estado de esterilización de la mascota.
     * Valores: 1 = esterilizado, 0 = no esterilizado, 2 = no aplica.
     */
    @Column ( name = "p_sterilized" )
    private int p_sterilized;

    /**
     * La foto de perfil de la mascota.
     */
    @Column ( name = "p_profile_picture" )
    private String p_profile_picture;

    /**
     * La descripción de la mascota.
     */
    @Column ( name = "p_description" )
    private String p_description;

    /**
     * El contacto de emergencia de la mascota.
     */
    @Column ( name = "p_emergency_contact" )
    private String p_emergency_contact;

    /**
     * Verifica si esta mascota es igual a otro objeto.
     *
     * @param o el objeto con el que comparar
     * @return true si los objetos son iguales, false en caso contrario
     */
    @Override
    public final boolean equals( Object o ) {
        if( this == o )
            return true;
        if( o == null )
            return false;
        Class< ? > oEffectiveClass = o instanceof HibernateProxy ? ( ( HibernateProxy ) o ).getHibernateLazyInitializer( ).getPersistentClass( ) : o.getClass( );
        Class< ? > thisEffectiveClass = this instanceof HibernateProxy ? ( ( HibernateProxy ) this ).getHibernateLazyInitializer( ).getPersistentClass( ) : this.getClass( );
        if( thisEffectiveClass != oEffectiveClass )
            return false;
        Pet pet = ( Pet ) o;
        return getP_id( ) != null && Objects.equals( getP_id( ), pet.getP_id( ) );
    }

    /**
     * Devuelve el código hash de esta mascota.
     *
     * @return el código hash
     */
    @Override
    public final int hashCode( ) {
        return this instanceof HibernateProxy ? ( ( HibernateProxy ) this ).getHibernateLazyInitializer( ).getPersistentClass( ).hashCode( ) : getClass( ).hashCode( );
    }
}