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
    public Breed getBreedById(@PathVariable Long id) {
        return breedService.getbreedbyID(id);

    }

    @PostMapping("/create")
    public void createBreed(@RequestBody Breed breed) {
        breedService.createBreed(breed);
    }

    @PutMapping("/{id}")
    public void updateBreed(@PathVariable Long id,@RequestBody Breed breed) {
        breedService.updateBreed(id, breed);
    }

    @DeleteMapping("/{id}")
    public void deleteBreed(@PathVariable Long id) {
        breedService.deleteBreed(id);
    }

    @GetMapping("/search")
    public List<Breed> searchBreeds(@RequestParam("text") String text) {
        return breedService.searchBreeds(text);
    }
}