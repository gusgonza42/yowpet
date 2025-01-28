package com.yowpet.backend.repository;

import com.yowpet.backend.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findAllByEstadoNot(int estado);
    Optional<Lesson> findByIdAndEstadoNot(Long id, int estado);
    List<Lesson> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseAndEstadoNot(String title, String content, int estado);
}
