package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Modelo de entidad para representar una Alergia.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "allergies" )
public class Allergy {

    /**
     * Identificador único para la alergia.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "id" )
    private Long id;

    /**
     * Nombre de la alergia.
     */
    @Column ( name = "name", nullable = false )
    private String name;

    /**
     * Foto de la alergia.
     */
    @Lob
    @Column ( name = "photo" )
    private byte[] photo;

    /**
     * Lista de mascotas que tienen esta alergia.
     */
    @ManyToMany ( mappedBy = "allergies", fetch = FetchType.LAZY )
    @JsonIgnore
    @ToString.Exclude
    private List< Pet > pets;
}