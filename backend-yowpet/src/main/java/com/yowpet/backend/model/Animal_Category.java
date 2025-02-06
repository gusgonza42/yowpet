package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Modelo de entidad para representar una Categoría de Animal.
 * Utiliza anotaciones JPA para mapear la clase a una tabla de base de datos.
 * <p>
 * Incluye anotaciones de Lombok para generar automáticamente getters, setters, constructores y otros métodos.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "animal_category" )
public class Animal_Category {

    /**
     * Identificador único para la Categoría de Animal.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    private Long id;

    /**
     * Nombre de la categoría de animal.
     */
    @Column( name = "ac_name" )
    private String name;

    /**
     * Lista de animales en esta categoría.
     */
//    @OneToMany ( mappedBy = "animalCategory", cascade = CascadeType.ALL, orphanRemoval = true )
//    @ToString.Exclude
//    @JsonIgnore
//    private List< Breed > animals;
}