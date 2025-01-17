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
@Table ( name = "pets" )
public class Pet {

    /**
     * Unique identifier for the Allergy.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int p_id;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "r_id", nullable = false)
    private Raca animal;
}