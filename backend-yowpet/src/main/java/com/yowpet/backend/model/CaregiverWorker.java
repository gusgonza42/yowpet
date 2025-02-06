package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Entidad que representa a un cuidador.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "caregiver_worker" )
public class CaregiverWorker {

    /**
     * Identificador único del cuidador.
     */
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "id" )
    private Long id;

    /**
     * Usuario asociado al cuidador.
     */
    @OneToOne
    @JoinColumn( name = "user_id", nullable = false, unique = true )
    private User user;

    /**
     * Especialidad del cuidador.
     */
    @Column( name = "speciality" )
    private String speciality;

    /**
     * Años de experiencia del cuidador.
     */
    @Column( name = "experience_years" )
    private int experienceYears;

    /**
     * Tarifa por hora del cuidador.
     */
    @Column( name = "hourly_rate", precision = 10 )
    private Double hourlyRate;

    /**
     * Calificación del cuidador.
     */
    @Column( name = "rating", precision = 2 )
    private Double rating;

    /**
     * Reseña del cuidador.
     */
    @Column( name = "review" )
    private String review;

    /**
     * Descripción del cuidador.
     */
    @Column( name = "description" )
    private String description;

    /**
     * Servicio del cuidador.
     */
    @Column( name = "service_worker" )
    private String serviceWorker;

    /**
     * Estado del trabajador cuidador (por ejemplo, activo = true, inactivo = falsé).
     */
    @Column( name = "status_active_work" )
    private boolean statusActiveWork = true;

    /**
     * Fecha de creación del registro del cuidador.
     */
    @Column( name = "created_at" )
    @Temporal( TemporalType.TIMESTAMP )
    private Date createdAt;

    /**
     * Metodo de ciclo de vida que se ejecuta antes de persistir el registro.
     * Establece la fecha de creación si no está definida.
     */
    @PrePersist
    protected void onCreate( ) {
        if ( createdAt == null ) {
            createdAt = new Date( );
        }
    }


}