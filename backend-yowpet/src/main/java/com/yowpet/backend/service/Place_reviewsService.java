package com.yowpet.backend.service;

import com.yowpet.backend.model.Place_reviews;
import com.yowpet.backend.repository.Place_reviewRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Place_reviewsService {
    private final Place_reviewRepo place_reviewsRepository;

    public Place_reviewsService(Place_reviewRepo place_reviewsRepository) {
        this.place_reviewsRepository = place_reviewsRepository;
    }

    //GET all place_reviews
    public ResponseEntity<List<Place_reviews>> getAllPlace_reviews() {
        try {
            List<Place_reviews> place_reviews = place_reviewsRepository.findAllByEstadoNot(0);
            if (place_reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(place_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET place_review by ID
    public ResponseEntity<Place_reviews> getPlace_reviewById(int id) {
        try {
            Optional<Place_reviews> place_reviews = place_reviewsRepository.findByIdAndEstadoNot(id, 0);
            return place_reviews.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET place_reviews by rating
    public ResponseEntity<List<Place_reviews>> searchPlace_reviews(double rating) {
        try {
            rating = Math.round(rating * 10.0) / 10.0;
            List<Place_reviews> place_reviews = place_reviewsRepository.getPlace_reviewsbyRating(rating);
            if (place_reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(place_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //POST (create place_review)
    public ResponseEntity<Place_reviews> createPlace_review(Place_reviews place_reviews) {
        try {
            double rating = place_reviews.getRating();
            rating = Math.round(rating * 10.0) / 10.0;
            place_reviews.setRating(rating);
         //   place_reviews.setId(null);
            place_reviewsRepository.createPlace_reviews(place_reviews);
            return ResponseEntity.status(HttpStatus.CREATED).body(place_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //PUT update place_review
    public ResponseEntity<Place_reviews> updatePlace_review(int id, Place_reviews  updatedPlace_reviews) {
        try {
            Place_reviews existingPlace_reviews = place_reviewsRepository.getPlace_review(id);
            if (existingPlace_reviews == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            existingPlace_reviews.setRating(updatedPlace_reviews.getRating());
            existingPlace_reviews.setComment(updatedPlace_reviews.getComment());
            existingPlace_reviews.setEstado(updatedPlace_reviews.getEstado());
          place_reviewsRepository.updatePlace_reviews(existingPlace_reviews);
            return ResponseEntity.ok(existingPlace_reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //DELETE place_review
    public ResponseEntity<Place_reviews> deletePlace_review(int id) {
        try {
           Place_reviews existingPlace_reviews = place_reviewsRepository.getPlace_review(id);
            if (existingPlace_reviews == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            existingPlace_reviews.setEstado(0);
            place_reviewsRepository.updatePlace_reviews(existingPlace_reviews);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
