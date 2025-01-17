package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity model to represent a relation between Allergy and pet.
 * Uses JPA annotations to map the class to a database table.
 * <p>
 * Includes Lombok annotations to automatically generate getter, setter, constructors, and other methods.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "illness")
public class Illness {


    /**
     * Unique identifier for the Illness.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    /**
     * the Allergy.
     * <p>
     * Many-to-one relationship with Allergy entity.
     */

    @ManyToOne
    @JoinColumn(name = "al_id", nullable = false)
    private Allergy allergy;

    /**
     *
     * The pet.
     */

      @ManyToOne
      @JoinColumn(name = "p_id", nullable = false)
     private Pet pet;

}