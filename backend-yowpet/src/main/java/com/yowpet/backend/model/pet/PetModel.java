package com.yowpet.backend.model.pet;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity model to represent a pet.
 * Uses JPA annotations to map the class to a database table.
 *
 * Includes Lombok annotations to automatically generate getter, setter, constructors, and other methods.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "pet_test" )
public class PetModel {

    /**
     * Unique identifier for the pet.
     */
    @Id
    private int id;

    /**
     * Name of the pet.
     */
    private String name;
}