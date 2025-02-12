package com.yowpet.backend.controller;

import com.yowpet.backend.model.AnimalCategory;
import com.yowpet.backend.model.Breed;

import com.yowpet.backend.model.BreedRequestDTO;
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
    public void createBreed(@RequestBody BreedRequestDTO req) {
Breed breed = new Breed();
 breed.setName(req.getBreed().getName());
breed.setAnimalCategory(req.getAnimalCategory());
        System.out.println("Final Breed: "+breed);
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

    @GetMapping("/getcat/{id}")
    public Breed getBreedByAnimalCat(@PathVariable Long id ) {
        Breed breed = breedService.getbreedbyID(id);

        System.out.println("Breed: "+breed);
        return breed;
    }
    @GetMapping("/getcats/{id}")
    public AnimalCategory getAnimalCat(@PathVariable Long id ) {
        AnimalCategory animalCategory = breedService.getAnimalCat(id);

        System.out.println("AnimalCategory: "+animalCategory);
        return animalCategory;
    }
}