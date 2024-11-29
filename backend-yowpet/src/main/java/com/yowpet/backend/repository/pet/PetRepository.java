package com.yowpet.backend.repository.pet;

import com.yowpet.backend.model.pet.PetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for the PetModel entity.
 * Provides CRUD methods for the PetModel entity.
 */
@Repository
public interface PetRepository extends JpaRepository< PetModel, Long > {
}