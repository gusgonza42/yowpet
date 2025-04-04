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
@Entity
@Table( name = "user" )
public class UserJWT {
    public static final int status_active = 1;
    public static final int role_user = 2;

    /**
     * El identificador único para el usuario.
     */
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "id" )
    private Long id;

    /**
     * El nombre del usuario.
     */
    @Column( name = "first_name", nullable = false )
    private String firstName;

    /**
     * El apellido del usuario.
     */
    @Column( name = "last_name", nullable = false )
    private String lastName;

    /**
     * El nombre de usuario del usuario.
     */
    @Column( name = "username", nullable = false, unique = true )
    private String username;

    /**
     * El correo electrónico del usuario.
     */
    @Column( name = "email", nullable = false, unique = true )
    private String email;

    /**
     * La contraseña del usuario.
     */
    @Column( name = "password", nullable = false )
    private String password;

    /**
     * La ciudad del usuario.
     */
    @Column( name = "city" )
    private String city = "No especificado";

    /**
     * La dirección del usuario.
     */
    @Column( name = "address", length = 150 )
    private String address = "No especificado";

    /**
     * El estado del usuario.
     * Valor por defecto: 1 = activo, 0 = inactivo
     */
    @Column( name = "status" )
    private Integer status = status_active;

    /**
     * El número de teléfono del usuario.
     */
    @Column( name = "phone_number", length = 9 )
    private Integer phoneNumber = 0;


    /**
     * El código postal del usuario.
     */
    @Column( name = "zip_code", length = 5 )
    private Integer zipCode = 0;


    /**
     * El género del usuario.
     * Valores: 1 = masculino, 0 = femenino, 2 = no binario, 3 = otros.
     */
    @Column( name = "gender" )
    private String gender = "No especificado";

    /**
     * La foto de perfil del usuario.
     */
    @Column( name = "profile_picture" )
    private String profilePicture = "No especificado";

    /**
     * El rol del usuario.
     * Valores: 0 = admin, 1 = cuidador, 2 = usuario.
     */
    @Column( name = "role" )
    private Integer role = role_user;
    /**
     * La fecha de CREACION del usuario.
     */
    @Column( name = "birth_date" )
    @Temporal( TemporalType.DATE )
    private Date birthDate = null;

    /**
     * Los idiomas que habla el usuario.
     */
    private String languages = "No especificado";

    /**
     * El metodo de pago del usuario.
     */
    @Column( name = "payment_method" )
    private String paymentMethod = "No especificado";

    private String token = "No especificado";

    /**
     * La fecha de creación del usuario.
     */
    @Column( name = "created_at" )
    @Temporal( TemporalType.DATE )
    private Date createdAt;

    /**
     * La fecha de última actualización del usuario.
     */
    @Column( name = "updated_at" )
    @Temporal( TemporalType.TIMESTAMP )
    private Date updatedAt = null;

    /**
     * La fecha de eliminación del usuario.
     */
    @Column( name = "deleted_at" )
    @Temporal( TemporalType.TIMESTAMP )
    private Date deletedAt = null;

    /**
     * Establece la fecha de registro al crear el objeto usuario.
     */
    @PrePersist
    protected void onCreate( ) {
        if ( createdAt == null ) {
            createdAt = new Date( );
        }
    }
}