package com.yowpet.backend.controller;

import com.yowpet.backend.model.Place;
import com.yowpet.backend.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/place")
public class PlaceController {
    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Place>> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable int id) {
        return placeService.getPlaceById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Place>> searchPlace(@RequestParam("query") String query) {
        return placeService.searchPlace(query);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createPlace(@RequestBody Place place) {
        return placeService.createPlace(place);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updatePlace(@PathVariable int id, @RequestBody Place place) {
        return placeService.updatePlace(id, place);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable int id) {
        return placeService.deletePlace(id);
    }
}
