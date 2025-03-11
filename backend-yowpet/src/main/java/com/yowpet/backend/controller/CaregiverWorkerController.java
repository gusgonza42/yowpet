package com.yowpet.backend.controller;

import com.yowpet.backend.model.CaregiverWorker;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.CaregiverWorkerRepository;
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
    private final UserRepository userRepository;
    private final CaregiverWorkerRepository caregiverWorkerRepository;

    /**
     * Constructor del CaregiverWorkerController.
     *
     * @param caregiverWorkerService    el servicio para gestionar los trabajadores cuidadores
     * @param userRepository            el repositorio de usuarios
     * @param caregiverWorkerRepository el repositorio de cuidadores
     */
    public CaregiverWorkerController( CaregiverWorkerService caregiverWorkerService , UserRepository userRepository , CaregiverWorkerRepository caregiverWorkerRepository ) {
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
    public ResponseEntity< User > activateCaregiver( @PathVariable Long id ) {
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
    public ResponseEntity< CaregiverWorker > createCaregiver( @PathVariable Long id , @RequestBody CaregiverWorker caregiverWorker ) {
        User user = userRepository.findById( id ).orElse( null );
        if ( user == null ) {
            return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
        }
        user.setUpdatedAt( new Date( ) );
        caregiverWorker.setUser( user );

        Optional< CaregiverWorker > existingCaregiverOpt = caregiverWorkerRepository.findByUser_Id( id );
        if ( existingCaregiverOpt.isPresent( ) ) {
            CaregiverWorker existingCaregiver = existingCaregiverOpt.get( );
            if ( ! existingCaregiver.isStatusActiveWork( ) ) {
                existingCaregiver.setStatusActiveWork( true );
                existingCaregiver.setSpeciality( caregiverWorker.getSpeciality( ) );
                existingCaregiver.setExperienceYears( caregiverWorker.getExperienceYears( ) );
                existingCaregiver.setHourlyRate( caregiverWorker.getHourlyRate( ) );
                existingCaregiver.setRating( caregiverWorker.getRating( ) );
                existingCaregiver.setReview( caregiverWorker.getReview( ) );
                existingCaregiver.setDescription( caregiverWorker.getDescription( ) );
                existingCaregiver.setServiceWorker( caregiverWorker.getServiceWorker( ) );
                existingCaregiver.setCreatedAt( new Date( ) );
                return caregiverWorkerService.createCaregiver( existingCaregiver );
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
    public ResponseEntity< CaregiverWorker > getCaregiverById( @PathVariable Long id ) {
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
    public ResponseEntity< CaregiverWorker > updateCaregiver( @PathVariable Long id , @RequestBody CaregiverWorker caregiverWorker ) {
        return caregiverWorkerService.updateCaregiver( id , caregiverWorker );
    }

    /**
     * Desactiva un cuidador.
     *
     * @param id el ID del cuidador a desactivar
     * @return la entidad de respuesta con el usuario desactivado
     */
    @DeleteMapping( "/disabled/{id}" )
    public ResponseEntity< User > disabledCaregiver( @PathVariable Long id ) {
        return caregiverWorkerService.disabledCaregiver( id );
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
    public ResponseEntity< CaregiverWorker > rateCaregiver( @PathVariable Long id , @RequestBody CaregiverWorker caregiverWorker ) {
        return caregiverWorkerService.rateCaregiver( id , caregiverWorker );
    }
}