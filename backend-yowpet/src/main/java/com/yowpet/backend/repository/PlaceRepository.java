package com.yowpet.backend.repository;

import com.yowpet.backend.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findAllByEstadoNot(int estado);
    Optional<Place> findByIdAndEstadoNot(Long id, int estado);
    List<Place> findByNameContainingIgnoreCaseAndEstadoNot(String name, int estado);
}
