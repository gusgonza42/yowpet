package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Modelo de entidad para representar la raza de un animal.
 * Utiliza anotaciones JPA para mapear la clase a una tabla de base de datos.
 * <p>
 * Incluye anotaciones de Lombok para generar automáticamente getters, setters, constructores y otros métodos.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "breed" )
public class Breed {

    /**
     * Identificador único para la raza.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "id" )
    private int id;

    /**
     * Nombre de la raza.
     */
    @Column ( name = "name" )
    private String name;

    /**
     * Referencia a la categoría del animal.
     */
    @ManyToOne ( fetch = FetchType.LAZY )
    @JoinColumn ( name = "animal_category", nullable = false )
    @ToString.Exclude
    private Animal_Category animalCategory;

}