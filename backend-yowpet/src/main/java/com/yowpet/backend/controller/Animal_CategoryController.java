package com.yowpet.backend.controller;

import com.yowpet.backend.model.Animal_Category;
import com.yowpet.backend.service.Animal_CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/animalCat")
public class Animal_CategoryController {

    @Autowired
    private Animal_CategoryService service;

    @GetMapping
    public List<Animal_Category> getAllcats() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Animal_Category getById(Long id) {
        return service.getbyID(id);

    }

    @PostMapping
    public void create(Animal_Category category) {
        service.create(category);
    }

    @PutMapping("/{id}")
    public void update(Long id, Animal_Category category) {
        service.update(id, category);
    }

    @DeleteMapping("/{id}")
    public void delete(Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public List<Animal_Category> search(@RequestParam("text") String text) {
        return service.search(text);
    }
}