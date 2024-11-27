package com.yowpet.backend.repository.mysql.pet;

import com.yowpet.backend.model.mysql.pet.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository< Pet, Long > {
}