package com.yowpet.backend.repository;

import com.yowpet.backend.model.Place_reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Place_reviewsRepository extends JpaRepository<Place_reviews, Long> {
    List<Place_reviews> findAllByEstadoNot(int estado);
    Optional<Place_reviews> findByIdAndEstadoNot(Long id, int estado);
    @Query("SELECT r FROM Place_reviews r WHERE ROUND(r.rating, 1) = :rating AND r.estado != 0")
    List<Place_reviews> findByRoundedRatingAndEstadoNot(@Param("rating") double rating);
}
