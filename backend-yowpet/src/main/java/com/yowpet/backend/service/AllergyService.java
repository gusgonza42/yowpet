package com.yowpet.backend.service;


import com.yowpet.backend.model.Allergy;
import com.yowpet.backend.repository.AllergyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllergyService {

    @Autowired
    private AllergyRepo repo;

    public Allergy getbyID(int id){
        return repo.getAllergy(id);
    };

    public List<Allergy> getAll() {
        return repo.getAllergies();
    }

    public void create(Allergy allergy) {

        repo.createAllergy(allergy.getId(),allergy.getName());
    }

    public void update(int id, Allergy allergy) {
        allergy.setId(id);

        System.out.println("Allergy ID: " + allergy.getId());

        repo.updateAllergy(allergy.getId(), allergy.getName());
    }

    public void delete(int id) {
        repo.deleteAllergy(id);
    }

    public List<Allergy> search(String name) {
        return repo.searchAllergies(name);
    }
}