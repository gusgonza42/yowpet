package com.yowpet.backend.repository;

import com.yowpet.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    boolean existsByReservationDate(Date reservationDate);

    List< Reservation> findByStatus( Integer status );
}