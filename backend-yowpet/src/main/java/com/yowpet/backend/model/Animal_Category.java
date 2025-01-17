package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Entity model to represent a Animal Category.
 * Uses JPA annotations to map the class to a database table.
 *
 * Includes Lombok annotations to automatically generate getter, setter, constructors, and other methods.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "animal_category" )
public class Animal_Category {

    /**
     * Unique identifier for the Animal Category.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    /**
     * Name of the animal category.
     */
    private String ac_name;

    /**
     * List of animals in this category.
     */
    @OneToMany(mappedBy = "animalCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Breed> animals;
}