package com.yowpet.backend.service;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.repository.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio para manejar las operaciones relacionadas con las mascotas.
 */
@Service
public class PetService {

    private final PetRepo petRepo;

    @Autowired
    public PetService(PetRepo petRepo) {
        this.petRepo = petRepo;
    }

    public ResponseEntity<String> createPet(Pet pet) {
        try {
            petRepo.createPet(pet);
            return ResponseEntity.status(HttpStatus.CREATED).body("Pet created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating pet");
        }
    }

    public ResponseEntity<List<Pet>> getAllPets() {
        try {
            List<Pet> pets = petRepo.getAllPets();
            return ResponseEntity.status(HttpStatus.OK).body(pets);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public ResponseEntity<Pet> getPetById(int id) {
        try {
            Pet pet = petRepo.getPet(id);
            if (pet == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(pet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public ResponseEntity<Pet> updatePet(Pet pet) {
        try {
            petRepo.updatePet(pet);
            return ResponseEntity.status(HttpStatus.OK).body(pet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public ResponseEntity<String> deletePet(int id) {
        try {
            petRepo.deletePet(id);
            return ResponseEntity.status(HttpStatus.OK).body("Pet deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting pet");
        }
    }
}
