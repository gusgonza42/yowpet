package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

/**
 * Modelo de entidad para representar la raza de un animal.
 * Utiliza anotaciones JPA para mapear la clase a una tabla de base de datos.
 * <p>
 * Incluye anotaciones de Lombok para generar automáticamente getters, setters, constructores y otros métodos.
 */
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "breed")
public class Breed {

    /**
     * Identificador único para la raza.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    /**
     * Nombre de la raza.
     */
    @Column(name = "name")
    String name;

    /**
     * Referencia a la categoría del animal.
     */
 @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "animal_category_id", nullable = false)
private AnimalCategory animalCategory;

}