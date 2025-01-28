package com.yowpet.backend.repository;

import com.yowpet.backend.model.Lesson_reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Lesson_reviewsRepository extends JpaRepository<Lesson_reviews, Long> {
    List<Lesson_reviews> findAllByEstadoNot(int estado);
    Optional<Lesson_reviews> findByIdAndEstadoNot(Long id, int estado);
    @Query("SELECT r FROM Lesson_reviews r WHERE ROUND(r.rating, 1) = :rating AND r.estado != 0")
    List<Lesson_reviews> findByRoundedRatingAndEstadoNot(@Param("rating") double rating);
}
