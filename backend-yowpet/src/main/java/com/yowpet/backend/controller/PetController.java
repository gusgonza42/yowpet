package com.yowpet.backend.controller;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.service.PetService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

/**
 * Controlador REST para manejar las operaciones relacionadas con las mascotas.
 */
@RestController
@RequestMapping("/yowpet/pet")
public class PetController {

    private final PetService petService;

    @Value("${upload.path}")
    private String uploadPath;

    /**
     * Constructor para inyectar el servicio de mascotas.
     *
     * @param petService el servicio de mascotas
     */
    public PetController(PetService petService) {
        this.petService = petService;
    }

    /**
     * Crea una nueva mascota.
     *
     * @param pet la mascota a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    @PostMapping("/create")
    public ResponseEntity<String> createPet(@RequestBody Pet pet) {
        return petService.createPet(pet);
    }

    /**
     * Obtiene todas las mascotas.
     *
     * @return una respuesta HTTP con la lista de mascotas
     */
    @GetMapping("/all")
    public ResponseEntity<List<Pet>> getAllUsers() {
        return petService.getAllPets();
    }

    /**
     * Obtiene una mascota por su ID.
     *
     * @param id el ID de la mascota
     * @return una respuesta HTTP con la mascota encontrada
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable int id) {
        return petService.getPetById(id);
    }

    /**
     * Actualiza una mascota existente.
     *
     * @param id  el ID de la mascota a actualizar
     * @param pet los nuevos datos de la mascota
     * @return una respuesta HTTP con la mascota actualizada
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable int id, @RequestBody Pet pet) {
        return petService.updatePet(pet);
    }

    /**
     * Elimina una mascota por su ID.
     *
     * @param id el ID de la mascota a eliminar
     * @return una respuesta HTTP con el resultado de la operación
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePet(@PathVariable int id) {
        return petService.deletePet(id);
    }

    @GetMapping("/user/{userid}")
    public ResponseEntity<List<Pet>> getPetsByUserId(@PathVariable int userid) {
        return petService.getPetsByUserId(userid);
    }

    @GetMapping("/{petId}/photo")
    public ResponseEntity<Resource> getPetPhoto(@PathVariable int petId) {
        return petService.loadPetPhoto(petId,uploadPath);
    }
    @PutMapping("/{id}/photo")
    public ResponseEntity<?> uploadPetPhoto(
            @PathVariable int id,
            @RequestParam("file") MultipartFile file) throws IOException {
        return petService.savePetPhoto(id, file, uploadPath);
    }


//    @PostMapping("/illnes/{id}")
//    public ResponseEntity< Pet > addIllnes( @PathVariable int id,@RequestBody Pet pet ) {
//        return petService.updatePet( id, pet );
//    }
}