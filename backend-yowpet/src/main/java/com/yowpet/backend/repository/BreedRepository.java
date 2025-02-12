package com.yowpet.backend.repository;

import com.yowpet.backend.model.Breed;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BreedRepository extends JpaRepository<Breed, Long>{

       List<Breed> findByNameContaining(String name);
}
