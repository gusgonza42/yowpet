package com.yowpet.backend.service;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.repository.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
            Optional<List<Pet>> pets = Optional.ofNullable(petRepo.getAllPets());
            return ResponseEntity.status(HttpStatus.OK).body(pets.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public ResponseEntity<Pet> getPetById(int id) {
        try {
            Optional<Pet> pet = Optional.ofNullable(petRepo.getPet(id));
            if (pet.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(pet.get());
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
