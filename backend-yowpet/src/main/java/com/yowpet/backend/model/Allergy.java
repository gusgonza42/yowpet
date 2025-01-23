package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Entity model to represent an Allergy.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "allergies")
public class Allergy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @ManyToMany(mappedBy = "allergies", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Pet> pets;
}
