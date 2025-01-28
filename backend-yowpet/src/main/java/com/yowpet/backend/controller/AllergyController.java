package com.yowpet.backend.controller;

import com.yowpet.backend.model.Allergy;
import com.yowpet.backend.model.Animal_Category;
import com.yowpet.backend.service.AllergyService;
import com.yowpet.backend.service.Animal_CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/allergy")
public class AllergyController {

    @Autowired
    private AllergyService service;

    @GetMapping
    public List<Allergy> getAllcats() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Allergy getById(Long id) {
        return service.getbyID(id);

    }

    @PostMapping
    public void create(Allergy allergy) {
        service.create(allergy);
    }

    @PutMapping("/{id}")
    public void update(Long id, Allergy allergy) {
        service.update(id, allergy);
    }

    @DeleteMapping("/{id}")
    public void delete(Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public List<Allergy> search(@RequestParam("text") String text) {
        return service.search(text);
    }

}