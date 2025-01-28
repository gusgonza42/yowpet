package com.yowpet.backend.controller;

import com.yowpet.backend.model.Breed;

import com.yowpet.backend.service.BreedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/breed")
public class BreedController {

    @Autowired
    private BreedService breedService;

    @GetMapping
    public List<Breed> getAllBreeds() {
        return breedService.getAllBreeds();
    }

    @GetMapping("/{id}")
    public Breed getBreedById(Long id) {
        return breedService.getbreedbyID(id);

    }

    @PostMapping
    public void createBreed(Breed breed) {
        breedService.createBreed(breed);
    }

    @PutMapping("/{id}")
    public void updateBreed(Long id, Breed breed) {
        breedService.updateBreed(id, breed);
    }

    @DeleteMapping("/{id}")
    public void deleteBreed(Long id) {
        breedService.deleteBreed(id);
    }
}