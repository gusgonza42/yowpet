package com.yowpet.backend.controller;

import com.yowpet.backend.model.CaregiverWorker;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.CareGiverRepo;
import com.yowpet.backend.repository.UserRepo;
import com.yowpet.backend.service.CaregiverWorkerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar los cuidadores.
 */
@RestController
@RequestMapping( "/yowpet/caregiver" )
public class CaregiverWorkerController {
    private final CaregiverWorkerService caregiverWorkerService;
    private final UserRepo userRepository;
    private final CareGiverRepo caregiverWorkerRepository;

    /**
     * Constructor del CaregiverWorkerController.
     *
     * @param caregiverWorkerService    el servicio para gestionar los trabajadores cuidadores
     * @param userRepository            el repositorio de usuarios
     * @param caregiverWorkerRepository el repositorio de cuidadores
     */
    public CaregiverWorkerController( CaregiverWorkerService caregiverWorkerService , UserRepo userRepository , CareGiverRepo caregiverWorkerRepository ) {
        this.caregiverWorkerService = caregiverWorkerService;
        this.userRepository = userRepository;
        this.caregiverWorkerRepository = caregiverWorkerRepository;
    }

    /**
     * Activa un cuidador.
     *
     * @param id el ID del cuidador a activar
     * @return la entidad de respuesta con el usuario activado como cuidador
     */
    @PostMapping( "/activate/{id}" )
    public ResponseEntity< User > activateCaregiver( @PathVariable int id ) {
        return caregiverWorkerService.activateCaregiver( id );
    }

    /**
     * Crea un nuevo cuidador.
     *
     * @param id              el ID del usuario al que se le asignará el cuidador
     * @param caregiverWorker los detalles del cuidador a crear
     * @return la entidad de respuesta con el cuidador creado
     */
    @PostMapping( "/create/{id}" )
    public ResponseEntity< CaregiverWorker > createCaregiver( @PathVariable int id , @RequestBody CaregiverWorker caregiverWorker ) {
        User user = userRepository.getUser( id );
        if ( user == null ) {
            return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
        }
        user.setUpdatedAt( new Date( ) );
        caregiverWorker.setUser( user.getId() );

         CaregiverWorker  existingCaregiverOpt = caregiverWorkerRepository.getCaregiverWorkersByUser( id );
        if ( existingCaregiverOpt == null ) {
            if ( ! existingCaregiverOpt.isStatusActiveWork( ) ) {
                existingCaregiverOpt.setStatusActiveWork( true );
                existingCaregiverOpt.setSpeciality( caregiverWorker.getSpeciality( ) );
                existingCaregiverOpt.setExperienceYears( caregiverWorker.getExperienceYears( ) );
                existingCaregiverOpt.setHourlyRate( caregiverWorker.getHourlyRate( ) );
                existingCaregiverOpt.setRating( caregiverWorker.getRating( ) );
                existingCaregiverOpt.setReview( caregiverWorker.getReview( ) );
                existingCaregiverOpt.setDescription( caregiverWorker.getDescription( ) );
                existingCaregiverOpt.setServiceWorker( caregiverWorker.getServiceWorker( ) );
                existingCaregiverOpt.setCreatedAt( new Date( ) );
                return caregiverWorkerService.createCaregiver( existingCaregiverOpt );
            }
        }

        return caregiverWorkerService.createCaregiver( caregiverWorker );
    }

    /**
     * Recupera todos los cuidadores.
     *
     * @return la entidad de respuesta con la lista de todos los cuidadores
     */
    @GetMapping( "/all" )
    public ResponseEntity< List< CaregiverWorker > > getAllCaregivers( ) {
        return caregiverWorkerService.getAllCaregivers( );
    }

    /**
     * Recupera un cuidador por ID.
     *
     * @param id el ID del cuidador a recuperar
     * @return la entidad de respuesta con los detalles del cuidador
     */
    @GetMapping( "/{id}" )
    public ResponseEntity< CaregiverWorker > getCaregiverById( @PathVariable int id ) {
        return caregiverWorkerService.getCaregiverById( id );
    }

    /**
     * Actualiza los detalles de un cuidador.
     *
     * @param id              el ID del cuidador a actualizar
     * @param caregiverWorker los detalles actualizados del cuidador
     * @return la entidad de respuesta con el cuidador actualizado
     */
    @PutMapping( "/update/{id}" )
    public ResponseEntity< CaregiverWorker > updateCaregiver( @PathVariable int id , @RequestBody CaregiverWorker caregiverWorker ) {
        return caregiverWorkerService.updateCaregiver( id , caregiverWorker );
    }

    /**
     * Desactiva un cuidador.
     *
     * @param id el ID del cuidador a desactivar
     * @return la entidad de respuesta con el usuario desactivado
     */
    @DeleteMapping( "/disabled/{id}" )
    public ResponseEntity< User > disabledCaregiver( @PathVariable int id ) {
        return caregiverWorkerService.disableCaregiver( id );
    }

    /**
     * Recupera cuidadores disponibles por especialidad.
     *
     * @param speciality la especialidad para filtrar cuidadores disponibles
     * @return la entidad de respuesta con la lista de cuidadores disponibles en la especialidad especificada
     */
    @GetMapping( "/available" )
    public ResponseEntity< List< CaregiverWorker > > getAvailableCaregiversBySpecialty( @RequestParam( "speciality" ) String speciality ) {
        return caregiverWorkerService.getAvailableCaregiversBySpeciality( speciality );
    }

    /**
     * Recupera todos los cuidadores disponibles.
     *
     * @return la entidad de respuesta con la lista de todos los cuidadores disponibles
     */
    @GetMapping( "/availables" )
    public ResponseEntity< List< CaregiverWorker > > getAvailableCaregivers( ) {
        return caregiverWorkerService.getAvailableCaregivers( );
    }

    /**
     * Califica a un cuidador.
     *
     * @param id              el ID del cuidador a calificar
     * @param caregiverWorker los detalles de la calificación del cuidador
     * @return la entidad de respuesta con el cuidador calificado
     */
    @PostMapping( "/rate/{id}" )
    public ResponseEntity< CaregiverWorker > rateCaregiver( @PathVariable int id , @RequestBody CaregiverWorker caregiverWorker ) {
        return caregiverWorkerService.rateCaregiver( id , caregiverWorker );
    }
}