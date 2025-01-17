package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table ( name = "Reservation" )
public class Reservation {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    @Column ( name = "r_id" )
    private Long r_id;

    @ManyToOne
    @JoinColumn ( name = "r_user_id", referencedColumnName = "u_id" )
    private User r_user_id;

    @ManyToOne
    @JoinColumn ( name = "r_care_giver_id", referencedColumnName = "u_id" )
    private User r_care_giver_id;

    @Column ( name = "r_reservation_date" )
    @Temporal ( TemporalType.TIMESTAMP )
    private Date r_reservation_date;

    // por defecto el estado de una reserva sera 1 = activo, 0 = cancelado, 2 = completado
    @Column ( name = "r_status" )
    private int r_status = 1;
}