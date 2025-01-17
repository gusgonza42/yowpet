package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Represents a pet entity in the system.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pet")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_id")
    private Long p_id;

    @Column(name = "p_animal_id", nullable = false)
    private String p_animal_id;

    @ManyToOne
    @JoinColumn(name = "p_owner_id", referencedColumnName = "u_id")
    private User p_owner;

    @ManyToOne
    @JoinColumn(name = "p_breed_id", referencedColumnName = "b_id")
    private Breed p_breed_id;

    @ManyToMany
    @JoinTable(
            name = "pet_allergies",
            joinColumns = @JoinColumn(name = "p_id"),
            inverseJoinColumns = @JoinColumn(name = "al_id")
    )
    private List<Allergy> allergies;

    @Column(name = "p_status", nullable = false)
    private int p_status = 1;

    @Column(name = "p_name", nullable = false)
    private String p_name;

    @Temporal(TemporalType.DATE)
    @Column(name = "p_birth_date")
    private Date p_birth_date;

    @Column(name = "p_gender", nullable = false)
    private String p_gender;

    @Column(name = "p_sterilized", nullable = false)
    private int p_sterilized;

    @Column(name = "p_profile_picture")
    private String p_profile_picture;

    @Column(name = "p_description")
    private String p_description;

    @Column(name = "p_emergency_contact")
    private String p_emergency_contact;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pet)) return false;
        Pet pet = (Pet) o;
        return Objects.equals(p_id, pet.p_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(p_id);
    }
}
