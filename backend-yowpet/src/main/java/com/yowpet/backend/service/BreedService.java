package com.yowpet.backend.service;

import com.yowpet.backend.model.Breed;
import com.yowpet.backend.repository.BreedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BreedService {

    @Autowired
    private BreedRepo repo;

    public Breed getbreedbyID(int id) {
        return repo.getBreed(id);
    }

    ;

    @Transactional
    public List<Breed> getAllBreeds() {
        return repo.getBreeds();
    }

    public void createBreed(Breed breed) {

        System.out.println(breed);
        repo.createBreed(breed.getAnimalCatId(), breed.getName());
    }

    public void updateBreed(int id, Breed breed) {
        breed.setId(id);

        System.out.println("Breed ID: " + breed.getId());

        repo.updateBreed(breed.getId(), breed.getName(), breed.getAnimalCatId());
    }

    public void deleteBreed(int id) {
        repo.deleteBreed(id);
    }

    public List<Breed> searchBreeds(String name) {
        return repo.searchBreeds(name);
    }


}