package com.yowpet.backend.service;

import com.yowpet.backend.model.CaregiverWorker;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.CaregiverWorkerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Servicio para gestionar los cuidadores.
 */
@Service
public class CaregiverWorkerService {
    private final CaregiverWorkerRepository caregiverWorkerRepository;
    private final UserRepository userRepository;

    /**
     * Constructor del CaregiverWorkerService.
     *
     * @param caregiverWorkerRepository el repositorio de trabajadores cuidadores
     * @param userRepository            el repositorio de usuarios
     */
    public CaregiverWorkerService( CaregiverWorkerRepository caregiverWorkerRepository , UserRepository userRepository ) {
        this.caregiverWorkerRepository = caregiverWorkerRepository;
        this.userRepository = userRepository;
    }

    /**
     * Activa un cuidador.
     *
     * @param id el ID del cuidador a activar
     * @return la entidad de respuesta con el usuario activado
     */
    public ResponseEntity< User > activateCaregiver( Long id ) {
        try {
            User user = userRepository.findById( id ).orElse( null );
            if ( user == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            user.setRole( User.role_caregiver );
            userRepository.save( user );
            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( user );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Crea un nuevo cuidador.
     *
     * @param caregiverWorker los detalles del cuidador a crear
     * @return la entidad de respuesta con el cuidador creado
     */
    public ResponseEntity< CaregiverWorker > createCaregiver( CaregiverWorker caregiverWorker ) {
        try {
            User user = userRepository.findById( caregiverWorker.getUser( ).getId( ) ).orElse( null );
            if ( user == null ) {
                return ResponseEntity.status( HttpStatus.FORBIDDEN ).build( );
            }
            user.setUpdatedAt( new Date( ) );
            user.setRole( User.role_caregiver );
            caregiverWorker.setUser( user );
            CaregiverWorker savedCaregiver = caregiverWorkerRepository.save( caregiverWorker );
            return ResponseEntity.ok( savedCaregiver );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    /**
     * Recupera todos los cuidadores.
     *
     * @return la entidad de respuesta con la lista de todos los cuidadores
     */
    public ResponseEntity< List< CaregiverWorker > > getAllCaregivers( ) {
        try {
            List< CaregiverWorker > caregiverWorkers = caregiverWorkerRepository.findAll( );
            if ( caregiverWorkers.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            return ResponseEntity.ok( caregiverWorkers );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    /**
     * Recupera un cuidador por ID.
     *
     * @param id el ID del cuidador a recuperar
     * @return la entidad de respuesta con los detalles del cuidador
     */
    public ResponseEntity< CaregiverWorker > getCaregiverById( Long id ) {
        try {
            Optional< CaregiverWorker > caregiverWorker = caregiverWorkerRepository.findById( id );
            return caregiverWorker.map( ResponseEntity::ok ).orElseGet( ( ) -> ResponseEntity.status( HttpStatus.NOT_FOUND ).build( ) );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    /**
     * Actualiza los detalles de un cuidador.
     *
     * @param id               el ID del cuidador a actualizar
     * @param updatedCaregiver los detalles actualizados del cuidador
     * @return la entidad de respuesta con el cuidador actualizado
     */
    public ResponseEntity< CaregiverWorker > updateCaregiver( Long id , CaregiverWorker updatedCaregiver ) {
        try {
            Optional< CaregiverWorker > existingCaregiverOpt = caregiverWorkerRepository.findById( id );
            if ( existingCaregiverOpt.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }

            CaregiverWorker existingCaregiver = existingCaregiverOpt.get( );
            updateCaregiverDetails( existingCaregiver , updatedCaregiver );
            CaregiverWorker savedCaregiver = caregiverWorkerRepository.save( existingCaregiver );

            return ResponseEntity.ok( savedCaregiver );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    /**
     * Actualiza los detalles de un cuidador existente con los detalles de un cuidador actualizado.
     *
     * @param existingCaregiver el cuidador existente
     * @param updatedCaregiver  el cuidador actualizado
     */
    private void updateCaregiverDetails( CaregiverWorker existingCaregiver , CaregiverWorker updatedCaregiver ) {
        existingCaregiver.setSpeciality( updatedCaregiver.getSpeciality( ) );
        existingCaregiver.setExperienceYears( updatedCaregiver.getExperienceYears( ) );
        existingCaregiver.setHourlyRate( updatedCaregiver.getHourlyRate( ) );
        existingCaregiver.setRating( updatedCaregiver.getRating( ) );
        existingCaregiver.setReview( updatedCaregiver.getReview( ) );
        existingCaregiver.setDescription( updatedCaregiver.getDescription( ) );
        existingCaregiver.setServiceWorker( updatedCaregiver.getServiceWorker( ) );
    }

    /**
     * Desactiva un cuidador.
     *
     * @param id el ID del cuidador a desactivar tanto el activeStatusWork como su rol de cuidador
     * @return la entidad de respuesta con el usuario desactivado
     */
    public ResponseEntity< User > disabledCaregiver( Long id ) {
        try {
            User user = userRepository.findById( id ).orElse( null );
            if ( user == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            user.setRole( User.role_user );
            userRepository.save( user );

            Optional< CaregiverWorker > caregiverWorkerOpt = caregiverWorkerRepository.findByUser_Id( id );
            if ( caregiverWorkerOpt.isPresent( ) ) {
                CaregiverWorker caregiverWorker = caregiverWorkerOpt.get( );
                caregiverWorker.setStatusActiveWork( false );
                caregiverWorkerRepository.save( caregiverWorker );
            }

            return ResponseEntity.status( HttpStatus.ACCEPTED ).body( user );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Recupera cuidadores disponibles por especialidad.
     *
     * @param speciality la especialidad para filtrar cuidadores disponibles
     * @return la entidad de respuesta con la lista de cuidadores disponibles en la especialidad especificada
     */
    public ResponseEntity< List< CaregiverWorker > > getAvailableCaregiversBySpeciality( String speciality ) {
        try {
            List< CaregiverWorker > caregiverWorkers = caregiverWorkerRepository.findAllBySpecialityAndStatusActiveWorkTrue( speciality );
            if ( caregiverWorkers.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            return ResponseEntity.ok( caregiverWorkers );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    /**
     * Recupera todos los cuidadores disponibles.
     *
     * @return la entidad de respuesta con la lista de todos los cuidadores disponibles
     */
    public ResponseEntity< List< CaregiverWorker > > getAvailableCaregivers( ) {
        try {
            List< CaregiverWorker > caregiverWorkers = caregiverWorkerRepository.findAllByStatusActiveWorkTrue( );
            if ( caregiverWorkers.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }

            return ResponseEntity.ok( caregiverWorkers );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    /**
     * Califica a un cuidador.
     *
     * @param id              el ID del usuario que tiene el rol de cuidador a calificar
     * @param caregiverWorker los detalles de la calificación del cuidador
     * @return la entidad de respuesta con el cuidador calificado
     */
    public ResponseEntity< CaregiverWorker > rateCaregiver( Long id , CaregiverWorker caregiverWorker ) {
        try {
            Optional< CaregiverWorker > existingCaregiver = caregiverWorkerRepository.findByUser_Id( id );
            if ( existingCaregiver.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            CaregiverWorker caregiverToRate = existingCaregiver.get( );
            caregiverToRate.setRating( caregiverWorker.getRating( ) );
            caregiverWorkerRepository.save( caregiverToRate );
            return ResponseEntity.ok( caregiverToRate );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }
}