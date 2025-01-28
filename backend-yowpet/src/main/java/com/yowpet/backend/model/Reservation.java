package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

/**
 * Representa una entidad de reserva en el sistema.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "reservation" )
public class Reservation {
    public static final int STATUS_CANCELLED = 0;
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_COMPLETED = 2;

    /**
     * El identificador único para la reserva.
     */
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "r_id" )
    private Long id;

    /**
     * El usuario que hizo la reserva.
     */
    @ManyToOne
    @JoinColumn ( name = "r_user_id", referencedColumnName = "id" )
    private User user;

    /**
     * El cuidador asignado a la reserva.
     */
    @ManyToOne
    @JoinColumn ( name = "r_care_giver_id", referencedColumnName = "id" )
    private User careGiver;

    /**
     * Los detalles de la reserva.
     */
    @Column ( name = "r_details" )
    private String details;

    /**
     * La fecha y hora de la reserva.
     */
    @Column ( name = "r_reservation_date" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date reservationDate;

    /**
     * La fecha y hora en que la reserva fue cancelada.
     */
    @Column ( name = "r_reservation_cancelled_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date reservationCancelledAt;

    /**
     * La fecha y hora en que la reserva fue completada.
     */
    @Column ( name = "r_reservation_completed_at" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date reservationCompletedAt;

    /**
     * El estado de la reserva.
     * Valores por defecto: 1 = activo, 0 = cancelado, 2 = completado.
     */
    @Column ( name = "r_status" )
    private int status = STATUS_ACTIVE;

}