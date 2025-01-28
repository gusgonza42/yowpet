package com.yowpet.backend.repository;

import com.yowpet.backend.model.Animal_Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Animal_CategortRepository extends JpaRepository<Animal_Category, Long>{


        List<Animal_Category> findByNameContaining(String name);

        Animal_Category getById(Long id);
}
