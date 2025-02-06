package com.yowpet.backend.repository;

import com.yowpet.backend.model.CaregiverWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para gestionar las operaciones CRUD de los trabajadores cuidadores.
 */
@Repository
public interface CaregiverWorkerRepository extends JpaRepository< CaregiverWorker, Long > {

    /**
     * Encuentra todos los cuidadores con estado activo.
     *
     * @return una lista de cuidadores con estado activo
     */
    List< CaregiverWorker > findAllByStatusActiveWorkTrue( );

    /**
     * Encuentra un cuidador por el ID del usuario.
     *
     * @param userId el ID del usuario
     * @return un Optional que contiene el cuidador si se encuentra
     */
    Optional< CaregiverWorker > findByUser_Id( Long userId );

    /**
     * Encuentra todos los cuidadores disponibles por especialidad.
     *
     * @param specialty la especialidad para filtrar cuidadores disponibles
     * @return una lista de cuidadores disponibles en la especialidad especificada
     */
    List< CaregiverWorker > findAllBySpecialityAndStatusActiveWorkTrue( @Param( "specialty" ) String specialty );
}