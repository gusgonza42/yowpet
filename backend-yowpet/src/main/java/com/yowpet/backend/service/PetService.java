package com.yowpet.backend.service;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.repository.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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

    public ResponseEntity<List<Pet>> getPetsByUserId(int userid) {
        try {
            Optional<List<Pet>> pets = Optional.ofNullable(petRepo.getPetsByUserId(userid));
            return ResponseEntity.status(HttpStatus.OK).body(pets.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public ResponseEntity<?> savePetPhoto(int id, MultipartFile file, String uploadDir) {
        try {
            String fileName = file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Update pet photo URL in DB
            Pet pet = petRepo.getPet(id);
            pet.setProfilePicture("uploads/" + fileName); // Make sure your frontend knows how to build full URL
            petRepo.updatePet(pet);

            return ResponseEntity.ok("Photo uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not save file");
        }
    }

    public ResponseEntity<Resource> loadPetPhoto(int id, String uploadDir) {
        try {
            Pet pet = petRepo.getPet(id);
            String fileName = Paths.get(pet.getProfilePicture()).getFileName().toString();
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG) // or detect from extension
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
