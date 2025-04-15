package com.yowpet.backend.controller;

import com.yowpet.backend.model.Illness;
import com.yowpet.backend.service.IllnessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/illness")
public class IllnessController {

    @Autowired
    private IllnessService service;

    // Get all pet-illness records
    @GetMapping
    public ResponseEntity<?> getAll() {
        return service.getAll();
    }

    // Get illnesses by pet
    @GetMapping("/pet/{petId}")
    public ResponseEntity<?> getByPet(@PathVariable int petId) {
        return service.getByPet(petId);
    }

    // Get all pets that have a specific illness
   @GetMapping("/allergy/{illnessId}")
    public ResponseEntity<?> getByIllness(@PathVariable int illnessId) {
        return service.getByIllness(illnessId);
    }

    // Create a new pet-illness relation
    @PostMapping
    public void create(@RequestBody Illness illness) {
        service.create(illness);
    }

    // Update the status of a pet-illness relation
    @PutMapping
    public void updateStatus(@RequestParam int pet, @RequestParam int allergy, @RequestParam int state) {
        service.updateStatus(state, pet, allergy);
    }

    // Delete a pet-illness relation
    @DeleteMapping
    public void delete(@RequestParam int pet, @RequestParam int allergy) {
        service.delete(pet, allergy);
    }

    @GetMapping("/{petId}/{allergyId}")
    public ResponseEntity<?> getPetIllnessOfPet(@PathVariable int allergyId, @PathVariable int petId) {
        return service.getPetIllnessOfPet(allergyId, petId);
    }

}
