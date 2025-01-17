package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Entity model to represent an Allergy.
 * Uses JPA annotations to map the class to a database table.
 *
 * Includes Lombok annotations to automatically generate getter, setter, constructors, and other methods.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "allergies" )
public class Allergy {

    /**
     * Unique identifier for the Allergy.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int al_id;

    /**
     * Name of the animal.
     */
    private String al_name;

    private byte al_photo;

    @ManyToMany(mappedBy = "allergies", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Pet> pet;

}