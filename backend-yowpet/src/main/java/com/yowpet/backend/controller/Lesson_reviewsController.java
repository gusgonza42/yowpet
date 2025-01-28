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
        return lesson_reviewsService.getAllLesson_reviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson_reviews> getLesson_reviewById(@PathVariable Long id) {
        return lesson_reviewsService.getLesson_reviewById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Lesson_reviews>> searchLesson_reviews(@RequestParam("rating") double rating) {
        return lesson_reviewsService.searchLesson_reviews(rating);
    }

    @PostMapping("/create")
    public ResponseEntity<Lesson_reviews> createLesson_review(@RequestBody Lesson_reviews lesson_reviews) {
        return lesson_reviewsService.createLesson_review(lesson_reviews);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Lesson_reviews> updateLesson_review(@PathVariable Long id, @RequestBody Lesson_reviews lesson_reviews) {
        return lesson_reviewsService.updateLesson_review(id, lesson_reviews);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Lesson_reviews> deleteLesson_review(@PathVariable Long id) {
        return lesson_reviewsService.deleteLesson_review(id);
    }
}
