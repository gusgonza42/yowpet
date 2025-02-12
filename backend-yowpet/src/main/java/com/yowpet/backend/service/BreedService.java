package com.yowpet.backend.service;


import com.yowpet.backend.model.AnimalCategory;
import com.yowpet.backend.model.Breed;
import com.yowpet.backend.repository.AnimalCategortRepository;
import com.yowpet.backend.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BreedService {

    @Autowired
    private BreedRepository repo;
    private AnimalCategortRepository catrepo;

    public Breed getbreedbyID(long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("breed not found"));
    };

    @Transactional
    public List<Breed> getAllBreeds() {
        return repo.findAll();
    }

    public void createBreed(Breed breed) {

        System.out.println(breed);
        repo.save(breed);
    }

    public void updateBreed(Long id, Breed breed) {
        breed.setId(id);

        System.out.println("Breed ID: " + breed.getId());

        repo.save(breed);
    }

    public void deleteBreed(Long id) {
        repo.deleteById(id);
    }

    public List<Breed> searchBreeds(String name) {
        return repo.findByNameContaining(name);
    }

    public Breed getCatfrombreed(Long id){
        return repo.fullbreed(id);
    }
    public AnimalCategory getAnimalCat(Long id){
        AnimalCategory cat = repo.findWithBreeds(id);
        System.out.println("AnimalCategory: " + cat);
        return cat;
    }

}