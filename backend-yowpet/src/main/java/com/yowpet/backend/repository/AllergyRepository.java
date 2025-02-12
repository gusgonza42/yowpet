package com.yowpet.backend.repository;

import com.yowpet.backend.model.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllergyRepository extends JpaRepository<Allergy, Long>{

        List<Allergy> findByNameContaining(String name);

}
