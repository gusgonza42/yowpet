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
    public Breed getBreedById(@PathVariable int id) {
        return breedService.getbreedbyID(id);

    }

    @PostMapping("/create")
    public void createBreed(@RequestBody Breed req) {
        breedService.createBreed(req);
    }

    @PutMapping("/{id}")
    public void updateBreed(@PathVariable int id, @RequestBody Breed breed) {
        breedService.updateBreed(id, breed);
    }

    @DeleteMapping("/{id}")
    public void deleteBreed(@PathVariable int id) {
        breedService.deleteBreed(id);
    }

    @GetMapping("/search")
    public List<Breed> searchBreeds(@RequestParam("text") String text) {
        return breedService.searchBreeds(text);
    }

    @GetMapping("/getcat/{id}")
    public Breed getBreedByAnimalCat(@PathVariable int id) {
        Breed breed = breedService.getbreedbyID(id);

        System.out.println("Breed: " + breed);
        return breed;
    }
}