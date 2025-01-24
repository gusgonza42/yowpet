package com.yowpet.backend.controller;

import com.yowpet.backend.model.Reservation;
import com.yowpet.backend.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para manejar las operaciones relacionadas con las reservas.
 */
@RestController
@RequestMapping ( "/yowpet/reservation" )
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * Constructor para inyectar el servicio de reservas.
     *
     * @param reservationService el servicio de reservas
     */
    public ReservationController( ReservationService reservationService ) {
        this.reservationService = reservationService;
    }

    /**
     * Crea una nueva reserva.
     *
     * @param reservation la reserva a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    @PostMapping ( "/create" )
    public ResponseEntity< String > createReservation( @RequestBody Reservation reservation ) {
        return reservationService.createReservation( reservation );
    }

    /**
     * Obtiene todas las reservas activas de un usuario.
     *
     * @param userId el ID del usuario
     * @return una respuesta HTTP con la lista de reservas
     */
    @GetMapping ( "/user/{userId}" )
    public ResponseEntity< List< Reservation > > getReservationsByUser( @PathVariable Long userId ) {
        return reservationService.getReservationsByUser( userId );
    }

    /**
     * Obtiene todas las reservas activas de un cuidador.
     *
     * @param careGiverId el ID del cuidador
     * @return una respuesta HTTP con la lista de reservas
     */
    @GetMapping ( "/caregiver/{careGiverId}" )
    public ResponseEntity< List< Reservation > > getReservationsByCareGiver( @PathVariable Long careGiverId ) {
        return reservationService.getReservationsByCareGiver( careGiverId );
    }

    /**
     * Actualiza una reserva existente.
     *
     * @param id          el ID de la reserva a actualizar
     * @param reservation los nuevos datos de la reserva
     * @return una respuesta HTTP con la reserva actualizada
     */
    @PutMapping ( "/update/{id}" )
    public ResponseEntity< Reservation > updateReservation( @PathVariable Long id, @RequestBody Reservation reservation ) {
        return reservationService.updateReservation( id, reservation );
    }

    /**
     * Cancela (elimina lógicamente) una reserva.
     *
     * @param id el ID de la reserva a cancelar
     * @return una respuesta HTTP con el resultado de la operación
     */
    @DeleteMapping ( "/delete/{id}" )
    public ResponseEntity< String > cancelReservation( @PathVariable Long id ) {
        return reservationService.cancelReservation( id );
    }

    /**
     * Marca una reserva como completada.
     *
     * @param id el ID de la reserva a completar
     * @return una respuesta HTTP con el resultado de la operación
     */
    @PutMapping ( "/complete/{id}" )
    public ResponseEntity< String > completeReservation( @PathVariable Long id ) {
        return reservationService.completeReservation( id );
    }

    /**
     * Obtiene las reservas por estado.
     *
     * @param status el estado de las reservas a buscar
     * @return una respuesta HTTP con la lista de reservas
     */
    @GetMapping ( "/status/{status}" )
    public ResponseEntity< List< Reservation > > getReservationsByStatus( @PathVariable int status ) {
        return reservationService.getReservationsByStatus( status );
    }
}