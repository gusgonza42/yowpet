package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Date;
import java.util.Objects;

/**
 * Representa una entidad de usuario en el sistema.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "user" )
public class User {
    public static int status_active = 1;
    public static int status_inactive = 0;

    /**
     * El identificador único para el usuario.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "u_id" )
    private Long id;

    /**
     * El nombre del usuario.
     */
    @Column ( name = "u_first_name", nullable = false )
    private String firstName;

    /**
     * El apellido del usuario.
     */
    @Column ( name = "u_last_name", nullable = false )
    private String lastName;

    /**
     * El correo electrónico del usuario.
     */
    @Column ( name = "u_email", nullable = false, unique = true )
    private String email;

    /**
     * La contraseña del usuario.
     */
    @Column ( name = "u_password", nullable = false )
    private String password;

    /**
     * La ciudad del usuario.
     */
    @Column ( name = "u_city" )
    private String city;

    /**
     * La dirección del usuario.
     */
    @Column ( name = "u_address", length = 150 )
    private String address;

    /**
     * El estado del usuario.
     * Valor por defecto: 1 = activo, 0 = inactivo
     */
    @Column ( name = "u_status" )
    private int status = status_active;

    /**
     * El número de teléfono del usuario.
     */
    @Column ( name = "u_phone_number", length = 9 )
    private int phoneNumber;

    /**
     * El código postal del usuario.
     */
    @Column ( name = "u_zip_code", length = 5 )
    private int zipCode;

    /**
     * El género del usuario.
     * Valores: 1 = masculino, 0 = femenino, 2 = no binario, 3 = otros.
     */
    @Column ( name = "u_gender" )
    private String gender;

    /**
     * La foto de perfil del usuario.
     */
    @Column ( name = "u_profile_picture" )
    private String profilePicture;

    /**
     * El rol del usuario.
     * Valores: 0 = admin, 1 = cuidador, 2 = usuario.
     */
    @Column ( name = "u_role" )
    private int role = 2;

    /**
     * La fecha de nacimiento del usuario.
     */
    @Column ( name = "u_birth_date" )
    @Temporal ( TemporalType.DATE )
    private Date birthDate;

    /**
     * El metodo de pago del usuario.
     */
    @Column ( name = "u_payment_method" )
    private String paymentMethod;

    /**
     * La fecha de creación del usuario.
     */
    @Column ( name = "u_created_at" )
    @Temporal ( TemporalType.DATE )
    private Date createdAt;

    /**
     * La fecha de última actualización del usuario.
     */
    @Column ( name = "u_updated_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date updatedAt;

    /**
     * La fecha de eliminación del usuario.
     */
    @Column ( name = "u_deleted_at" )
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

    /**
     * Verifica si este usuario es igual a otro objeto.
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
        User user = ( User ) o;
        return getId( ) != null && Objects.equals( getId( ), user.getId( ) );
    }

    /**
     * Devuelve el código hash de este usuario.
     *
     * @return el código hash
     */
    @Override
    public final int hashCode( ) {
        return this instanceof HibernateProxy ? ( ( HibernateProxy ) this ).getHibernateLazyInitializer( ).getPersistentClass( ).hashCode( ) : getClass( ).hashCode( );
    }
}