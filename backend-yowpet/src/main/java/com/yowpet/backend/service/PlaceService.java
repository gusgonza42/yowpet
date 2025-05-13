package com.yowpet.backend.service;

import com.yowpet.backend.model.Place;
import com.yowpet.backend.repository.PlaceRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {
    private final PlaceRepo placeRepo;

    public PlaceService(PlaceRepo placeRepo) {
        this.placeRepo = placeRepo;
    }

    // GET all active places
    public ResponseEntity<List<Place>> getAllPlaces() {
        try {
            List<Place> places = placeRepo.getAllPlaces();
            if (places.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(places);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET place by ID
    public ResponseEntity<Place> getPlaceById(int id) {
        try {
            Place place = placeRepo.getPlace(id);
            return ResponseEntity.ok(place);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // SEARCH place by name or address
    public ResponseEntity<List<Place>> searchPlace(String query) {
        try {
            List<Place> places = placeRepo.searchPlaces(query);
            if (places.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(places);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CREATE place
    public ResponseEntity<Void> createPlace(Place place) {
        try {
            System.out.println(place);
            placeRepo.createPlace(place);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE place
    public ResponseEntity<Void> updatePlace(int id, Place updatedPlace) {
        try {
            updatedPlace.setId(id);
            placeRepo.updatePlace(updatedPlace);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE place (soft delete)
    public ResponseEntity<Void> deletePlace(int id) {
        try {
            placeRepo.deletePlace(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
