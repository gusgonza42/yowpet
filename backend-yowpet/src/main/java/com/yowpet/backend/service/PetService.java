package com.yowpet.backend.service;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.repository.PetRepository;
import com.yowpet.backend.utils.constants.YowPetConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Servicio para manejar las operaciones relacionadas con las mascotas.
 */
@Service
public class PetService {

    private final PetRepository petRepository;

    /**
     * Constructor para inyectar el repositorio de mascotas.
     *
     * @param petRepository el repositorio de mascotas
     */
    public PetService( PetRepository petRepository ) {
        this.petRepository = petRepository;
    }

    /**
     * Crea una nueva mascota.
     *
     * @param pet la mascota a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity< String > createPet( Pet pet ) {
        try {
            if( petRepository.existsPetByNameAndOwnerId( pet.getName( ), pet.getOwnerId( ) ) ) {
                return ResponseEntity.status( HttpStatus.CONFLICT ).body( YowPetConstants.PET_EXISTS );
            }
            petRepository.save( pet );
            return ResponseEntity.status( HttpStatus.CREATED ).body( YowPetConstants.PET_CREATED_SUCCESSFULLY );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( YowPetConstants.ERROR_INTERNO_DEL_SERVIDOR );
        }
    }

    /**
     * Obtiene todas las mascotas activas.
     *
     * @return una respuesta HTTP con la lista de mascotas
     */
    @Transactional
    public ResponseEntity< List< Pet > > getAllPets( ) {
        try {
            List< Pet > pets = petRepository.findByStatus( Pet.STATUS_ACTIVE );
            pets.forEach( pet -> pet.getAllergies( ).size( ) ); // Inicializar la colección
            return ResponseEntity.status( HttpStatus.OK ).body( pets );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Obtiene una mascota por su ID.
     *
     * @param id el ID de la mascota
     * @return una respuesta HTTP con la mascota encontrada
     */
    @Transactional
    public ResponseEntity< Pet > getPetById( Long id ) {
        try {
            Pet pet = petRepository.findById( id ).orElse( null );
            if( pet == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            pet.getAllergies( ).size( ); // Inicializar la colección
            return ResponseEntity.status( HttpStatus.OK ).body( pet );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Actualiza una mascota existente.
     *
     * @param id  el ID de la mascota a actualizar
     * @param pet los nuevos datos de la mascota
     * @return una respuesta HTTP con la mascota actualizada
     */
    public ResponseEntity< Pet > updatePet( Long id, Pet pet ) {
        try {
            Pet petToUpdate = petRepository.findById( id ).orElse( null );
            if( petToUpdate == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            petToUpdate.setName( pet.getName( ) );
            petToUpdate.setBirthDate( pet.getBirthDate( ) );
            petToUpdate.setGender( pet.getGender( ) );
            petToUpdate.setSterilized( pet.getSterilized( ) );
            petToUpdate.setProfilePicture( pet.getProfilePicture( ) );
            petToUpdate.setOwnerId( pet.getOwnerId( ) );
            petToUpdate.setBreed( pet.getBreed( ) );
            petToUpdate.setAllergies( pet.getAllergies( ) );
            petToUpdate.setStatus( pet.getStatus( ) );
            petToUpdate.setDescription( pet.getDescription( ) );
            petToUpdate.setEmergencyContact( pet.getEmergencyContact( ) );
            petToUpdate.setUpdatedAt( pet.getUpdatedAt( ) );
            petRepository.save( petToUpdate );
            return ResponseEntity.status( HttpStatus.OK ).body( petToUpdate );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Elimina (lógicamente) una mascota por su ID.
     *
     * @param id el ID de la mascota a eliminar
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity< String > deletePet( Long id ) {
        try {
            Pet pet = petRepository.findById( id ).orElse( null );
            if( pet == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            pet.setStatus( Pet.STATUS_INACTIVE );
            pet.setDeletedAt( pet.getUpdatedAt( ) );
            petRepository.save( pet );
            return ResponseEntity.status( HttpStatus.OK ).body( YowPetConstants.PET_DELETED_SUCCESSFULLY );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }
}