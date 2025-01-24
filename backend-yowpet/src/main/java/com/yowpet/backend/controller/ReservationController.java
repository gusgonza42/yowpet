package com.yowpet.backend.controller;

import com.yowpet.backend.model.Reservation;
import com.yowpet.backend.model.User;
import com.yowpet.backend.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ( "/yowpet/reservation" )
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController( ReservationService reservationService ) {
        this.reservationService = reservationService;
    }

    @PostMapping ( "/create" )
    public ResponseEntity< String > createReservation( @RequestBody Reservation reservation ) {
        return reservationService.createReservation( reservation );
    }


    @GetMapping ( "/all" )
    public ResponseEntity< List< Reservation > > getAllReservations( ) {
        return reservationService.getAllReservations( );
    }

    @GetMapping ( "/{status}" )
    public ResponseEntity< List< Reservation > > getReservationById( @PathVariable Integer status ) {
        return reservationService.getReservationById( status );
    }

    @PutMapping ( "/update/{id}" )
    public ResponseEntity< Reservation > updateReservation( @PathVariable Long id, @RequestBody Reservation reservation ) {
        return reservationService.updateReservation( id, reservation );
    }

    @DeleteMapping ( "/delete/{id}" )
    public ResponseEntity< String > deleteReservation( @PathVariable Long id ) {
        return reservationService.deleteReservation( id );
    }
}
