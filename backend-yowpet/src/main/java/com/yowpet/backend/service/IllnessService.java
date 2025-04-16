package com.yowpet.backend.service;

import com.yowpet.backend.model.Illness;
import com.yowpet.backend.repository.IllnessRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IllnessService {

    @Autowired
    private IllnessRepo repo;

    // Get all illnesses (across all pets)
    public ResponseEntity<?> getAll() {
        List<Illness> illnesses = repo.getAllergies();
        if (illnesses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron registros de enfermedades.");
        }
        return ResponseEntity.ok(illnesses);
    }

    // Get illnesses by pet ID
    public ResponseEntity<?> getByPet(int petId) {
        List<Illness> illnesses = repo.getByPet(petId);
        if (illnesses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron enfermedades para la mascota con ID: " + petId);
        }
        return ResponseEntity.ok(illnesses);
    }

    // Get illnesses by illness ID (i.e., reverse lookup — find all pets with a certain allergy)
    public ResponseEntity<?> getByIllness(int illnessId) {
        List<Illness> results = repo.getByIllness(illnessId);
        if (results.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron mascotas con la enfermedad ID: " + illnessId);
        }
        return ResponseEntity.ok(results);
    }

    // Update the status of an illness relationship
    public ResponseEntity<?> updateStatus(int newStatus, int petId, int illnessId) {
        try {
            repo.updateStatus(newStatus, petId, illnessId);
            return ResponseEntity.ok("Estado actualizado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el estado.");
        }
    }

    // Delete illness relationship
    public ResponseEntity<?> delete(int petId, int illnessId) {
        try {
            repo.deleteIllness(petId, illnessId);
            return ResponseEntity.ok("Relación de enfermedad eliminada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la relación de enfermedad.");
        }
    }

    public void create(Illness illness) {
        repo.create(illness);
    }

    public ResponseEntity<?> getPetIllnessOfPet(int allergyId, int petId) {
        Illness illness = repo.getPetIllnessOfPet(allergyId, petId);
        if (illness != null) {
            return ResponseEntity.ok(illness);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No illness found for allergy ID " + allergyId + " and pet ID " + petId);
        }
    }


}
