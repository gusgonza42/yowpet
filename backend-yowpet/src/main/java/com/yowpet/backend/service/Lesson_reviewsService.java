package com.yowpet.backend.service;

import com.yowpet.backend.model.Lesson_reviews;
import com.yowpet.backend.repository.Lesson_reviewsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Lesson_reviewsService {
    private final Lesson_reviewsRepository lesson_reviewsRepository;

    public Lesson_reviewsService(Lesson_reviewsRepository lesson_reviewsRepository) {
        this.lesson_reviewsRepository = lesson_reviewsRepository;
    }

    //GET all lesson_reviews
    public ResponseEntity<List<Lesson_reviews>> getAllLesson_reviews() {
        try {
            List<Lesson_reviews> lesson_reviews = lesson_reviewsRepository.findAllByEstadoNot(0);
            if (lesson_reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(lesson_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET lesson_review by ID
    public ResponseEntity<Lesson_reviews> getLesson_reviewById(Long id) {
        try {
            Optional<Lesson_reviews> lesson_reviews = lesson_reviewsRepository.findByIdAndEstadoNot(id, 0);
            return lesson_reviews.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET lesson_reviews by rating
    public ResponseEntity<List<Lesson_reviews>> searchLesson_reviews(double rating) {
        try {
            rating = Math.round(rating * 10.0) / 10.0;
            List<Lesson_reviews> lesson_reviews = lesson_reviewsRepository.findByRoundedRatingAndEstadoNot(rating);
            if (lesson_reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(lesson_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //POST (create lesson_review)
    public ResponseEntity<Lesson_reviews> createLesson_review(Lesson_reviews lesson_reviews) {
        try {
            double rating = lesson_reviews.getRating();
            rating = Math.round(rating * 10.0) / 10.0;
            lesson_reviews.setRating(rating);
            lesson_reviews.setId(null);
            Lesson_reviews newLesson_reviews = lesson_reviewsRepository.save(lesson_reviews);
            return ResponseEntity.status(HttpStatus.CREATED).body(newLesson_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //PUT update lesson_review
    public ResponseEntity<Lesson_reviews> updateLesson_review(Long id, Lesson_reviews  updatedLesson_reviews) {
        try {
            Optional<Lesson_reviews> existingLesson_reviews = lesson_reviewsRepository.findById(id);
            if (existingLesson_reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Lesson_reviews lesson_reviewToSave = existingLesson_reviews.get();
            lesson_reviewToSave.setRating(updatedLesson_reviews.getRating());
            lesson_reviewToSave.setComment(updatedLesson_reviews.getComment());
            lesson_reviewToSave.setEstado(updatedLesson_reviews.getEstado());
            Lesson_reviews savedLesson_reviews = lesson_reviewsRepository.save(lesson_reviewToSave);
            return ResponseEntity.ok(savedLesson_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //DELETE lesson_review
    public ResponseEntity<Lesson_reviews> deleteLesson_review(Long id) {
        try {
            Optional<Lesson_reviews> existingLesson_reviews = lesson_reviewsRepository.findById(id);
            if (existingLesson_reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Lesson_reviews lesson_reviewsToDelete = existingLesson_reviews.get();
            lesson_reviewsToDelete.setEstado(0);
            lesson_reviewsRepository.save(lesson_reviewsToDelete);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
