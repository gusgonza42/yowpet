package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

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
    public static int role_admin = 0;
    public static int role_caregiver = 1;
    public static int role_user = 2;

    /**
     * El identificador único para el usuario.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "id" )
    private Long id;

    /**
     * El nombre del usuario.
     */
    @Column ( name = "first_name", nullable = false )
    private String firstName;

    /**
     * El apellido del usuario.
     */
    @Column ( name = "last_name", nullable = false )
    private String lastName;

    /**
     * El correo electrónico del usuario.
     */
    @Column ( name = "email", nullable = false, unique = true )
    private String email;

    /**
     * La contraseña del usuario.
     */
    @Column ( name = "password", nullable = false )
    private String password;

    /**
     * La ciudad del usuario.
     */
    @Column ( name = "city" )
    private String city;

    /**
     * La dirección del usuario.
     */
    @Column ( name = "address", length = 150 )
    private String address;

    /**
     * El estado del usuario.
     * Valor por defecto: 1 = activo, 0 = inactivo
     */
    @Column ( name = "status" )
    private int status = status_active;

    /**
     * El número de teléfono del usuario.
     */
    @Column ( name = "phone_number", length = 9 )
    private int phoneNumber;

    /**
     * El código postal del usuario.
     */
    @Column ( name = "zip_code", length = 5 )
    private int zipCode;

    /**
     * El género del usuario.
     * Valores: 1 = masculino, 0 = femenino, 2 = no binario, 3 = otros.
     */
    @Column ( name = "gender" )
    private String gender;

    /**
     * La foto de perfil del usuario.
     */
    @Column ( name = "profile_picture" )
    private String profilePicture;

    /**
     * El rol del usuario.
     * Valores: 0 = admin, 1 = cuidador, 2 = usuario.
     */
    @Column ( name = "role" )
    private int role = role_user;

    /**
     * La fecha de nacimiento del usuario.
     */
    @Column ( name = "birth_date" )
    @Temporal ( TemporalType.DATE )
    private Date birthDate;

    /**
     * Los idiomas que habla el usuario.
     */
    private String languages;

    /**
     * El metodo de pago del usuario.
     */
    @Column ( name = "payment_method" )
    private String paymentMethod;

    /**
     * La fecha de creación del usuario.
     */
    @Column ( name = "created_at" )
    @Temporal ( TemporalType.DATE )
    private Date createdAt;

    /**
     * La fecha de última actualización del usuario.
     */
    @Column ( name = "updated_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date updatedAt;

    /**
     * La fecha de eliminación del usuario.
     */
    @Column ( name = "deleted_at" )
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
}