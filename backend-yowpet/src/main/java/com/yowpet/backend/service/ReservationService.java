package com.yowpet.backend.service;

import com.yowpet.backend.model.Reservation;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.ReservationRepository;
import com.yowpet.backend.utils.constants.YowPetConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * Servicio para manejar las operaciones relacionadas con las reservas.
 */
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserService userService;

    /**
     * Constructor para inyectar las dependencias necesarias.
     *
     * @param reservationRepository el repositorio de reservas
     * @param userService           el servicio de usuarios
     */
    public ReservationService( ReservationRepository reservationRepository, UserService userService ) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
    }

    /**
     * Crea una nueva reserva.
     *
     * @param reservation la reserva a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity< String > createReservation( @RequestBody Reservation reservation ) {
        try {
            // Validar que el usuario exista
            User user = userService.getUserById( reservation.getUser( ).getId( ) ).getBody( );
            if( user == null ) {
                return ResponseEntity.status( HttpStatus.BAD_REQUEST ).body( YowPetConstants.USUARIO_EXISTE_RESERVATION );
            }

            // Validar que el caregiver exista y tenga el rol adecuado
            User careGiver = userService.getUserById( reservation.getCareGiver( ).getId( ) ).getBody( );
            if( careGiver == null || careGiver.getRole( ) != 1 ) {
                return ResponseEntity.status( HttpStatus.BAD_REQUEST ).body( YowPetConstants.NO_ES_CUIDADOR );
            }

            // Validar que no haya solapamiento de reservas para el caregiver
            if( reservationRepository.existsByCareGiverAndReservationDate( careGiver, reservation.getReservationDate( ) ) ) {
                return ResponseEntity.status( HttpStatus.CONFLICT ).body( YowPetConstants.COINCIDENCIA_FECHAS_RESERVATION );
            }

            // Guardar la reserva
            reservationRepository.save( reservation );
            return ResponseEntity.status( HttpStatus.CREATED ).body( YowPetConstants.RESERVATION_CREADO_EXITOSAMENTE );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( YowPetConstants.ERROR_INTERNO_DEL_SERVIDOR );
        }
    }

    /**
     * Obtiene las reservas activas de un usuario específico.
     *
     * @param userId el ID del usuario
     * @return una respuesta HTTP con la lista de reservas
     */
    public ResponseEntity< List< Reservation > > getReservationsByUser( Long userId ) {
        try {
            List< Reservation > reservations = reservationRepository.findByUserIdAndStatus( userId, Reservation.STATUS_ACTIVE );
            return ResponseEntity.ok( reservations );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Obtiene las reservas activas de un cuidador específico.
     *
     * @param careGiverId el ID del cuidador
     * @return una respuesta HTTP con la lista de reservas
     */
    public ResponseEntity< List< Reservation > > getReservationsByCareGiver( Long careGiverId ) {
        try {
            List< Reservation > reservations = reservationRepository.findByCareGiverIdAndStatus( careGiverId, Reservation.STATUS_ACTIVE );
            return ResponseEntity.status( HttpStatus.OK ).body( reservations );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Actualiza una reserva existente.
     *
     * @param id          el ID de la reserva a actualizar
     * @param reservation los nuevos datos de la reserva
     * @return una respuesta HTTP con la reserva actualizada
     */
    public ResponseEntity< Reservation > updateReservation( Long id, Reservation reservation ) {
        try {
            Reservation reservationToUpdate = reservationRepository.findById( id ).orElse( null );
            if( reservationToUpdate == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }

            // Actualizar campos
            if( reservation.getReservationDate( ) != null ) {
                reservationToUpdate.setReservationDate( reservation.getReservationDate( ) );
            }
            if( reservation.getDetails( ) != null ) {
                reservationToUpdate.setDetails( reservation.getDetails( ) );
            }

            reservationRepository.save( reservationToUpdate );
            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( reservationToUpdate );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Cancela una reserva existente.
     *
     * @param id el ID de la reserva a cancelar
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity< String > cancelReservation( Long id ) {
        try {
            Reservation reservation = reservationRepository.findById( id ).orElse( null );
            if( reservation == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( YowPetConstants.RESERVA_NO_ENCONTRADA );
            }

            reservation.setStatus( Reservation.STATUS_CANCELLED );
            reservationRepository.save( reservation );
            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( YowPetConstants.RESERVATION_CANCELADO_EXITOSAMENTE );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( YowPetConstants.ERROR_INTERNO_DEL_SERVIDOR );
        }
    }

    /**
     * Marca una reserva como completada.
     *
     * @param id el ID de la reserva a completar
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity< String > completeReservation( Long id ) {
        try {
            Reservation reservation = reservationRepository.findById( id ).orElse( null );
            if( reservation == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( YowPetConstants.RESERVA_NO_ENCONTRADA );
            }

            // Cambiar el estado a completada
            reservation.setStatus( Reservation.STATUS_COMPLETED );
            reservationRepository.save( reservation );

            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( YowPetConstants.RESERVATION_COMPLETED_SUCCESSFULLY );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( YowPetConstants.ERROR_INTERNO_DEL_SERVIDOR );
        }
    }

    /**
     * Obtiene las reservas por estado.
     *
     * @param status el estado de las reservas a buscar
     * @return una respuesta HTTP con la lista de reservas
     */
    public ResponseEntity< List< Reservation > > getReservationsByStatus( int status ) {
        try {
            if( status < 0 || status > 2 ) {
                return ResponseEntity.status( HttpStatus.BAD_REQUEST ).body( null );
            }
            List< Reservation > reservations = reservationRepository.findByStatus( status );
            return ResponseEntity.status( HttpStatus.OK ).body( reservations );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }
}