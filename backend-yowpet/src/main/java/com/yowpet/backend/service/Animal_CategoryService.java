package com.yowpet.backend.service;


import com.yowpet.backend.model.Animal_Category;
import com.yowpet.backend.repository.Animal_CategortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Animal_CategoryService {

    @Autowired
    private Animal_CategortRepository repo;

    public Animal_Category getbyID(long id){
        return repo.getById(id);
    };

    public List<Animal_Category> getAll() {
        return repo.findAll();
    }

    public void create(Animal_Category Category) {
        repo.save(Category);
    }

    public void update(Long id, Animal_Category Category) {
        Category.setId(id);

        System.out.println("Animal_Category ID: " + Category.getId());

        repo.save(Category);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Animal_Category> search(String name) {
        return repo.findByNameContaining(name);
    }
}