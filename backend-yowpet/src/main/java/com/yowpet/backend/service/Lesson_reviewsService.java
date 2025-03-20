package com.yowpet.backend.service;

import com.yowpet.backend.model.Lesson_reviews;
import com.yowpet.backend.repository.Lesson_reviewRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Lesson_reviewsService {
    private final Lesson_reviewRepo lessonReviewsRepository;

    public Lesson_reviewsService(Lesson_reviewRepo lessonReviewsRepository) {
        this.lessonReviewsRepository = lessonReviewsRepository;
    }

    public ResponseEntity<List<Lesson_reviews>> getAllLessonReviews() {
        try {
            List<Lesson_reviews> lessonReviews = lessonReviewsRepository.getAllLessonReviews();
            if (lessonReviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(lessonReviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Lesson_reviews> getLessonReviewById(int id) {
        try {
            Lesson_reviews review = lessonReviewsRepository.getLessonReviewById(id);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<List<Lesson_reviews>> searchLessonReviews(double rating) {
        try {
            rating = Math.round(rating * 10.0) / 10.0;
            List<Lesson_reviews> reviews = lessonReviewsRepository.searchLessonReviewsByRating(rating);
            if (reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Lesson_reviews> createLessonReview(Lesson_reviews review) {
        try {
            review.setRating(Math.round(review.getRating() * 10.0) / 10.0);
            lessonReviewsRepository.createLessonReview(review);
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Lesson_reviews> updateLessonReview(int id, Lesson_reviews updatedReview) {
        try {
           Optional<Lesson_reviews> existingReview = Optional.ofNullable(lessonReviewsRepository.getLessonReviewById(id));
            if (existingReview.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            updatedReview.setId(id);
            lessonReviewsRepository.updateLessonReview(updatedReview);
            return ResponseEntity.ok(updatedReview);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Void> deleteLessonReview(int id) {
        try {
           Optional<Lesson_reviews> existingReview = Optional.ofNullable(lessonReviewsRepository.getLessonReviewById(id));
            if (existingReview.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            lessonReviewsRepository.deleteLessonReview(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
