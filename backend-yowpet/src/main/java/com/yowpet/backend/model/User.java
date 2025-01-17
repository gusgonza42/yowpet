package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Date;
import java.util.List;
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

    /**
     * El identificador único para el usuario.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "u_id" )
    private Long u_id;

    /**
     * El nombre del usuario.
     */
    @Column ( name = "u_first_name", nullable = false )
    private String u_first_name;

    /**
     * El apellido del usuario.
     */
    @Column ( name = "u_last_name", nullable = false )
    private String u_last_name;

    /**
     * El correo electrónico del usuario.
     */
    @Column ( name = "u_email", nullable = false, unique = true )
    private String u_email;

    /**
     * La contraseña del usuario.
     */
    @Column ( name = "u_password", nullable = false )
    private String u_password;

    /**
     * La ciudad del usuario.
     */
    @Column ( name = "u_city" )
    private String u_city;

    /**
     * La dirección del usuario.
     */
    @Column ( name = "u_address", length = 150 )
    private String u_address;

    /**
     * El estado del usuario.
     * Valor por defecto: 1 = activo, 0 = inactivo
     */
    @Column ( name = "u_status" )
    private int u_status = 1;

    /**
     * El número de teléfono del usuario.
     */
    @Column ( name = "u_phone_number", length = 9 )
    private int u_phone_number;

    /**
     * El código postal del usuario.
     */
    @Column ( name = "u_zip_code", length = 5 )
    private int u_zip_code;

    /**
     * El género del usuario.
     * Valores: 1 = masculino, 0 = femenino, 2 = no binario, 3 = otros.
     */
    @Column ( name = "u_gender" )
    private String u_gender;

    /**
     * La foto de perfil del usuario.
     */
    @Column ( name = "u_profile_picture" )
    private String u_profile_picture;

    /**
     * El rol del usuario.
     * Valores: 0 = admin, 1 = cuidador, 2 = usuario.
     */
    @Column ( name = "u_role" )
    private int u_role = 2;

    /**
     * La fecha de nacimiento del usuario.
     */
    @Column ( name = "u_birth_date" )
    @Temporal ( TemporalType.DATE )
    private Date u_birth_date;

    /**
     * El metodo de pago del usuario.
     */
    @Column ( name = "u_payment_method" )
    private String u_payment_method;

    /**
     * La fecha de creación del usuario.
     */
    @Column ( name = "u_created_at" )
    @Temporal ( TemporalType.DATE )
    private Date u_created_at;

    /**
     * La fecha de última actualización del usuario.
     */
    @Column ( name = "u_updated_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date u_updated_at;

    /**
     * La fecha de eliminación del usuario.
     */
    @Column ( name = "u_deleted_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date u_deleted_at;

    /**
     * Establece la fecha de registro al crear el objeto usuario.
     */
    @PrePersist
    protected void onCreate( ) {
        if( u_created_at == null ) {
            u_created_at = new Date( );
        }
    }

    @ManyToMany(mappedBy = "caretaker", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<User> caretaker;

    /**
     * Constructor para crear un nuevo usuario con el nombre, apellido, correo electrónico y contraseña especificados.
     *
     * @param u_first_name el nombre del usuario
     * @param u_last_name  el apellido del usuario
     * @param u_email      el correo electrónico del usuario
     * @param u_password   la contraseña del usuario
     */
    public User( String u_first_name, String u_last_name, String u_email, String u_password ) {
        this.u_first_name = u_first_name;
        this.u_last_name = u_last_name;
        this.u_email = u_email;
        this.u_password = u_password;
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
        return getU_id( ) != null && Objects.equals( getU_id( ), user.getU_id( ) );
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