package com.yowpet.backend.service;


import com.yowpet.backend.model.Breed;
import com.yowpet.backend.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreedService {

    @Autowired
    private BreedRepository repo;

    public Breed getbreedbyID(long id){
        return repo.getById(id);
    };

    public List<Breed> getAllBreeds() {
        return repo.findAll();
    }

    public void createBreed(Breed breed) {
        repo.save(breed);
    }

    public void updateBreed(Long id, Breed breed) {
        repo.save(breed);
    }

    public void deleteBreed(Long id) {
        repo.deleteById(id);
    }
}