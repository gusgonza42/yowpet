package com.yowpet.backend.service;


import com.yowpet.backend.model.Allergy;
import com.yowpet.backend.model.AnimalCategory;
import com.yowpet.backend.repository.AllergyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllergyService {

    @Autowired
    private AllergyRepository repo;

    public Allergy getbyID(long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Allergy not found"));
    };

    public List<Allergy> getAll() {
        return repo.findAll();
    }

    public void create(Allergy allergy) {
        repo.save(allergy);
    }

    public void update(Long id, Allergy allergy) {
        allergy.setId(id);

        System.out.println("Allergy ID: " + allergy.getId());

        repo.save(allergy);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Allergy> search(String name) {
        return repo.findByNameContaining(name);
    }
}