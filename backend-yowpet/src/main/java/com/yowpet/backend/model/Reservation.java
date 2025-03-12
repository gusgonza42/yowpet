package com.yowpet.backend.model;

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
public class Reservation {
    public static final int STATUS_CANCELLED = 0;
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_COMPLETED = 2;


    private int id;

    private int user;

    private int careGiver;

    private String details;

    private Date reservationDate;

    private Date reservationCancelledAt;

    private Date reservationCompletedAt;

    private int status = STATUS_ACTIVE;

}