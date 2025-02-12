package com.yowpet.backend.repository;

import com.yowpet.backend.model.AnimalCategory;
import com.yowpet.backend.model.Breed;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BreedRepository extends JpaRepository<Breed, Long> {

    List<Breed> findByNameContaining(String name);

    @Query("SELECT b FROM Breed b JOIN FETCH b.animalCategory WHERE b.id = :id")
    Breed fullbreed(@Param("id") Long id);

    @Query("SELECT ac FROM AnimalCategory ac LEFT JOIN FETCH ac.breeds WHERE ac.id = :id")
    AnimalCategory findWithBreeds(@Param("id") Long id);

}
