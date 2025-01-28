package com.yowpet.backend.service;

import com.yowpet.backend.model.Place;
import com.yowpet.backend.repository.PlaceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    //GET all places
    public ResponseEntity<List<Place>> getAllPlaces() {
        try{
            List<Place> places = placeRepository.findAllByEstadoNot(0);
            if (places.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(places);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET place by ID
    public ResponseEntity<Place> getPlaceById(Long id) {
        try {
            Optional<Place> place = placeRepository.findByIdAndEstadoNot(id, 0);
            return place.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET place by name or address
    public ResponseEntity<List<Place>> searchPlace(String query) {
        try {
            List<Place> places = placeRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseAndEstadoNot(query, query, 0);
            if (places.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(places);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //POST (create place)
    public ResponseEntity<Place> createPlace(Place place) {
        try {
            place.setId(null);
            Place newPlace = placeRepository.save(place);
            return ResponseEntity.status(HttpStatus.CREATED).body(newPlace);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //PUT update place
    public ResponseEntity<Place> updatePlace(Long id, Place updatedPlace) {
        try {
            Optional<Place> existingPlace = placeRepository.findById(id);
            if (existingPlace.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Place placeToSave = existingPlace.get();
            placeToSave.setName(updatedPlace.getName());
            placeToSave.setAddress(updatedPlace.getAddress());
            placeToSave.setAddresscode(updatedPlace.getAddresscode());
            placeToSave.setEstado(updatedPlace.getEstado());
            Place savedPlace = placeRepository.save(placeToSave);
            return ResponseEntity.ok(savedPlace);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //DELETE place
    public ResponseEntity<Place> deletePlace(Long id) {
        try {
            Optional<Place> existingPlace = placeRepository.findById(id);
            if (existingPlace.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Place placeToDelete = existingPlace.get();
            placeToDelete.setEstado(0);
            placeRepository.save(placeToDelete);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
