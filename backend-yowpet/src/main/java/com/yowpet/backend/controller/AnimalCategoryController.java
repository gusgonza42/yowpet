package com.yowpet.backend.controller;

import com.yowpet.backend.model.AnimalCategory;
import com.yowpet.backend.service.AnimalCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/animalCat")
public class AnimalCategoryController {

    @Autowired
    private AnimalCategoryService service;

    @GetMapping
    public List<AnimalCategory> getAllcats() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public  AnimalCategory getById(@PathVariable Long id) {
        return service.getbyID(id);

    }

    @PostMapping("/create")
    public void create(@RequestBody AnimalCategory category) {
        service.create(category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public List<AnimalCategory> search(@RequestParam("text") String text) {
        return service.search(text);
    }

    @PutMapping("/update/{id}")
    public  AnimalCategory update(@RequestBody AnimalCategory cat, @PathVariable long id)
    {return service.update(id,cat);}
}