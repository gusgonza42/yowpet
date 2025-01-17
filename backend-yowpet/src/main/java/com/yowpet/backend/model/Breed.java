package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Entity model to represent the race of animal.
 * Uses JPA annotations to map the class to a database table.
 * <p>
 * Includes Lombok annotations to automatically generate getter, setter, constructors, and other methods.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "breed")
public class Breed {

    /**
     * Unique identifier for the animal.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int r_id;

    /**
     * Name of the animal.
     */
    private String r_name;

    /**
     * Reference to the animal category.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Animal_Category animalCategory;

}