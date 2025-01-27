package com.yowpet.backend.controller;

import com.yowpet.backend.model.Place_reviews;
import com.yowpet.backend.service.Place_reviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/place_reviews")
public class Place_reviewsController {
    private final Place_reviewsService place_reviewsService;

    public Place_reviewsController(Place_reviewsService place_reviewsService) {
        this.place_reviewsService = place_reviewsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Place_reviews>> getAllPlace_reviews() {
        return place_reviewsService.getAllPlace_reviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place_reviews> getPlace_reviewById(@PathVariable Long id) {
        return place_reviewsService.getPlace_reviewById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Place_reviews>> searchPlace_reviews(@RequestParam("rating") double rating) {
        return place_reviewsService.searchPlace_reviews(rating);
    }

    @PostMapping("/create")
    public ResponseEntity<Place_reviews> createPlace_review(@RequestBody Place_reviews place_reviews) {
        return place_reviewsService.createPlace_review(place_reviews);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Place_reviews> updatePlace_review(@PathVariable Long id, @RequestBody Place_reviews place_reviews) {
        return place_reviewsService.updatePlace_review(id, place_reviews);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Place_reviews> deletePlace_review(@PathVariable Long id) {
        return place_reviewsService.deletePlace_review(id);
    }
}
