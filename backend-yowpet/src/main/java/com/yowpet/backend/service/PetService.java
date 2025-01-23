package com.yowpet.backend.service;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.repository.PetRepository;
import com.yowpet.backend.utils.constants.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService( PetRepository petRepository ) {
        this.petRepository = petRepository;
    }

    public ResponseEntity< String > createPet( Pet pet ) {
        try {
            if( petRepository.existsPetByNameAndOwnerId( pet.getName( ), pet.getOwnerId( ) ) ) {
                return ResponseEntity.status( HttpStatus.CONFLICT ).body( Constants.PET_EXISTS );
            }
            petRepository.save( pet );
            return ResponseEntity.status( HttpStatus.CREATED ).body( Constants.PET_CREATED_SUCCESSFULLY );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( Constants.ERROR_INTERNO_DEL_SERVIDOR );
        }
    }

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

    public ResponseEntity< String > deletePet( Long id ) {
        try {
            Pet pet = petRepository.findById( id ).orElse( null );
            if( pet == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            pet.setStatus( Pet.STATUS_INACTIVE );
            pet.setDeletedAt( pet.getUpdatedAt( ) );
            petRepository.save( pet );
            return ResponseEntity.status( HttpStatus.OK ).body( Constants.PET_DELETED_SUCCESSFULLY );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }

    }
}
