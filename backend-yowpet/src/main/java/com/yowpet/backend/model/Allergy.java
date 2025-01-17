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
    @Column(name = "al_id")
    private Long al_id;

    @Column(name = "al_name", nullable = false)
    private String al_name;

    @Lob
    @Column(name = "al_photo")
    private byte[] al_photo;

    @ManyToMany(mappedBy = "allergies", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Pet> pets;
}
