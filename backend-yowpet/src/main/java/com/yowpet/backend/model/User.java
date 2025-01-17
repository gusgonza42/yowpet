package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "user" )
public class User {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "u_id" )
    private Long u_id;

    @Column ( name = "u_first_name", nullable = false )
    private String u_first_name;

    @Column ( name = "u_last_name", nullable = false )
    private String u_last_name;

    @Column ( name = "u_email", nullable = false, unique = true )
    private String u_email;

    @Column ( name = "u_password", nullable = false )
    private String u_password;

    @Column ( name = "u_city" )
    private String u_city;

    @Column ( name = "u_address", length = 255 )
    private String u_address;

    // por defecto el estado de un usuario sera 1 = activo
    @Column ( name = "u_status" )
    private int u_status = 1;

    @Column ( name = "u_phone_number", length = 9 )
    private int u_phone_number;

    @Column ( name = "u_zip_code", length = 5 )
    private int u_zip_code;

    // el genero de un usuario sera 1 = masculino, 0 = femenino, 2 = no binario, 3 = otros
    @Column ( name = "u_gender" )
    private String u_gender;

    @Column ( name = "u_profile_picture" )
    private String u_profile_picture;

    /**
     * Rol del usuario (0 admin, 1 caregiver, 2 user).
     */
    @Column ( name = "u_role" )
    private int u_role = 2;

    @Column ( name = "u_birth_date" )
    @Temporal ( TemporalType.DATE )
    private Date u_birth_date;

    @Column ( name = "u_payment_method" )
    private String u_payment_method;

    @Column ( name = "u_created_at" )
    @Temporal ( TemporalType.DATE )
    private Date u_created_at;

    @Column ( name = "u_updated_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date u_updated_at;

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

    public User( String u_first_name, String u_last_name, String u_email, String u_password ) {
        this.u_first_name = u_first_name;
        this.u_last_name = u_last_name;
        this.u_email = u_email;
        this.u_password = u_password;
    }


}