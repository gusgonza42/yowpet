package com.yowpet.backend.repository;

import com.yowpet.backend.model.Breed;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BreedRepository extends JpaRepository<Breed, Long>{

       Breed getById(Long id);
}
