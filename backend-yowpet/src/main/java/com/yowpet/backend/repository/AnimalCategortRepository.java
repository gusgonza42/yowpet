package com.yowpet.backend.repository;

import com.yowpet.backend.model.AnimalCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalCategortRepository extends JpaRepository<AnimalCategory, Long> {
    List<AnimalCategory> findByNameContaining(String acName);
}