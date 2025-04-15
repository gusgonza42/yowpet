package com.yowpet.backend.service;

import com.yowpet.backend.model.Reservation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.yowpet.backend.repository.ReservationRepo;

import java.util.List;

/**
 * Servicio para manejar las operaciones relacionadas con las reservas.
 */
@Service
public class ReservationService {
    private final ReservationRepo reservationRepository;

    public ReservationService(ReservationRepo reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public void createReservation(Reservation reservation) {
        reservationRepository.createReservation(reservation);
    }

    public ResponseEntity< Reservation > updateReservation(int id, Reservation reservation) {
        reservationRepository.updateReservation(reservation);
        return ResponseEntity.ok(reservation);
    }

    public void CancelReservation(int id) {
        reservationRepository.deleteReservation(id);
    }

    public ResponseEntity< String > completeReservation(int id) {
        reservationRepository.completeReservation(id);
        return ResponseEntity.ok("Reservation completed");
    }

    public Reservation getReservationById(int id) {
        return reservationRepository.getReservationById(id);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.getAllReservations();
    }

    public List<Reservation> getReservationsByUser(int userId) {
        return reservationRepository.getReservationsByUser(userId);
    }

    public List<Reservation> getReservationsByCareGiver(int careGiverId) {
        return reservationRepository.getReservationsByCareGiver(careGiverId);
    }
    public List<Reservation> getReservationsByStatus(int status) {
        return reservationRepository.getReservationsByStatus(status);
    }
}
