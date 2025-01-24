package com.yowpet.backend.service;

import com.yowpet.backend.model.Reservation;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.ReservationRepository;
import com.yowpet.backend.utils.constants.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;

@Service
public class ReservationService {

    private ReservationRepository reservationRepository;

    public ReservationService( ReservationRepository reservationRepository ) {
        this.reservationRepository = reservationRepository;
    }

    public ResponseEntity< String > createReservation( @RequestBody Reservation reservation ) {
        try {
            if( reservationRepository.existsByReservationDate( reservation.getReservationDate( ) ) ) {
                return ResponseEntity.status( HttpStatus.CONFLICT ).body( Constants.RESERVATION_DATE_EXISTENTE );
            }
            reservationRepository.save( reservation );
            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( Constants.RESERVATION_CREADO_EXITOSAMENTE );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( "Internal server error" );
        }
    }

    public ResponseEntity< List< Reservation > > getAllReservations( ) {
        try {
            List< Reservation > reservations = reservationRepository.findByStatus( Reservation.STATUS_ACTIVE );
            return ResponseEntity.status( HttpStatus.OK ).body( reservations );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    public ResponseEntity< List< Reservation > > getReservationById( Integer status ) {
        try {
            List< Reservation > reservations;
            if( status == null ) {
                reservations = reservationRepository.findAll( );
            } else {
                reservations = reservationRepository.findByStatus( status );
            }
            return ResponseEntity.status( HttpStatus.OK ).body( reservations );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }

    }

    public ResponseEntity< Reservation > updateReservation( Long id, Reservation reservation ) {
        try {
            Reservation reservationToUpdate = reservationRepository.findById( id ).orElse( null );
            if( reservationToUpdate == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            if( reservation.getReservationDate( ) != null ) {
                reservationToUpdate.setReservationDate( reservation.getReservationDate( ) );
            }
            if( reservation.getUser( ) != null ) {
                reservationToUpdate.setUser( reservation.getUser( ) );
            }
            if( reservation.getCareGiver( ) != null ) {
                reservationToUpdate.setCareGiver( reservation.getCareGiver( ) );
            }
            if( reservation.getStatus( ) != 0 ) {
                reservationToUpdate.setStatus( reservation.getStatus( ) );
            }
            reservationRepository.save( reservationToUpdate );
            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( reservationToUpdate );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    public ResponseEntity< String > deleteReservation( Long id ) {
        try {
            Reservation reservation = reservationRepository.findById( id ).orElse( null );
            if( reservation == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            reservation.setStatus( Reservation.STATUS_CANCELLED );
            reservationRepository.save( reservation );
            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( Constants.RESERVATION_CANCELADO_EXITOSAMENTE );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }

    }
}
