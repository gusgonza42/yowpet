package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table (name = "caregiver_worker")
public class CaregiverWorker {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    /**
     * Relación con la tabla de usuarios (solo usuarios con rol 'caregiver' y estado activo pueden ser cuidadores).
     */
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /**
     * Especialidad del cuidador (por ejemplo, perros, gatos, aves, etc.).
     */
    @Column(name = "specialty")
    private String specialty;

    /**
     * Años de experiencia como cuidador.
     */
    @Column(name = "experience_years")
    private int experienceYears;

    /**
     * Horario de disponibilidad del cuidador (por ejemplo, "9 AM - 5 PM").
     */
    @Column(name = "availability")
    private String availability;

    /**
     * Tarifa por hora del cuidador.
     */
    @Column(name = "hourly_rate", precision = 10)
    private Double hourlyRate;


    /**
     * Calificación promedio del cuidador.
     */
    @Column(name = "rating", precision = 2)
    private Double rating;

    /**
     * Descripción o biografía del cuidador.
     */
    @Column(name = "bio")
    private String bio;

    /**
     * Fecha de creación del registro del cuidador.
     */
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = new Date();
        }
    }
}
