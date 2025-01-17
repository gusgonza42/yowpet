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
@Table ( name = "pet" )
public class Pet {

    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "p_id" )
    private Long p_id;

    @Column ( name = "p_animal_id" )
    private String p_animal_id;

    @ManyToOne
    @JoinColumn ( name = "p_owner_id", referencedColumnName = "u_id" )
    private User p_owner;

    // por defecto el estado de una mascota sera 1 = activo, 0 = inactivo
    @Column ( name = "p_status" )
    private int p_status = 1;

    @Column ( name = "p_name", nullable = false )
    private String p_name;

    @Column ( name = "p_birth_date" )
    @Temporal ( TemporalType.DATE )
    private Date p_birth_date;

    @Column ( name = "p_gender" )
    private String p_gender;

    // el estado de una mascota sera 1 = esterilizado, 0 = no esterilizado, 2 = no aplica
    @Column ( name = "p_sterilized" )
    private int p_sterilized;

    @Column ( name = "p_profile_picture" )
    private String p_profile_picture;

    @Column ( name = "p_description" )
    private String p_description;

    @Column ( name = "p_emergency_contact" )
    private String p_emergency_contact;
}