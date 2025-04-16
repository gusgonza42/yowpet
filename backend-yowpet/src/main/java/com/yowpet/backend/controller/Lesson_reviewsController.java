package com.yowpet.backend.controller;

import com.yowpet.backend.model.Lesson_reviews;
import com.yowpet.backend.service.Lesson_reviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/lesson_reviews")
public class Lesson_reviewsController {
    private final Lesson_reviewsService lesson_reviewsService;

    public Lesson_reviewsController(Lesson_reviewsService lesson_reviewsService) {
        this.lesson_reviewsService = lesson_reviewsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Lesson_reviews>> getAllLesson_reviews() {
        return lesson_reviewsService.getAllLessonReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson_reviews> getLesson_reviewById(@PathVariable int id) {
        return lesson_reviewsService.getLessonReviewById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Lesson_reviews>> searchLesson_reviews(@RequestParam("rating") double rating) {
        return lesson_reviewsService.searchLessonReviews(rating);
    }

    @PostMapping("/create")
    public ResponseEntity<Lesson_reviews> createLesson_review(@RequestBody Lesson_reviews lesson_reviews) {
        return lesson_reviewsService.createLessonReview(lesson_reviews);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Lesson_reviews> updateLesson_review(@PathVariable int id, @RequestBody Lesson_reviews lesson_reviews) {
        return lesson_reviewsService.updateLessonReview(id, lesson_reviews);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLesson_review(@PathVariable int id) {
        return lesson_reviewsService.deleteLessonReview(id);
    }
}
