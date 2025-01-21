package com.yowpet.backend.controller;

import com.yowpet.backend.model.Place;
import com.yowpet.backend.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/place")
public class PlaceController {
    private final PlaceService placeService;
    private final UserDetailsService userDetailsService;

    public PlaceController(PlaceService placeService, UserDetailsService userDetailsService) {
        this.placeService = placeService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Place>> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        return placeService.getPlaceById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Place>> searchPlace(@RequestParam("name") String name) {
        return placeService.searchPlace(id, name);
    }

    @PostMapping("/create")
    public ResponseEntity<Place> createPlace(@RequestBody Place place) {
        return placeService.createPlace(place);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Place> updatePlace(@PathVariable Long id, @RequestBody Place place) {
        return placeService.updatePlace(id, place);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Place> deletePlace(@PathVariable Long id) {
        return placeService.deletePlace(id);
    }
}
