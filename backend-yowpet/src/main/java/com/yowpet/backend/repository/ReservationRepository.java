package com.yowpet.backend.repository;

import com.yowpet.backend.model.Reservation;
import com.yowpet.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

/**
 * Repositorio para la entidad Reservation.
 * Proporciona métodos para realizar operaciones CRUD y consultas personalizadas.
 */
public interface ReservationRepository extends JpaRepository< Reservation, Long > {

    /**
     * Encuentra todas las reservas con un estado específico.
     *
     * @param status el estado de las reservas a buscar
     * @return una lista de reservas con el estado especificado
     */
    List< Reservation > findByStatus( Integer status );

    /**
     * Verifica si existe una reserva para un cuidador específico en una fecha específica.
     *
     * @param careGiver       el cuidador de la reserva
     * @param reservationDate la fecha de la reserva
     * @return true si existe una reserva para el cuidador en la fecha especificada, false en caso contrario
     */
    boolean existsByCareGiverAndReservationDate( User careGiver, Date reservationDate );

    /**
     * Encuentra todas las reservas activas de un usuario específico.
     *
     * @param userId       el ID del usuario
     * @param statusActive el estado activo de las reservas
     * @return una lista de reservas activas del usuario especificado
     */
    List< Reservation > findByUserIdAndStatus( Long userId, int statusActive );

    /**
     * Encuentra todas las reservas activas de un cuidador específico.
     *
     * @param careGiverId  el ID del cuidador
     * @param statusActive el estado activo de las reservas
     * @return una lista de reservas activas del cuidador especificado
     */
    List< Reservation > findByCareGiverIdAndStatus( Long careGiverId, int statusActive );
}