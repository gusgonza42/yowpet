package com.yowpet.backend.repository;

import com.yowpet.backend.model.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlaceRepo {

    @Autowired
    private JdbcTemplate template;

    // RowMapper for Place
    private final RowMapper<Place> placeRowMapper = (rs, rowNum) -> {
        Place place = new Place();
        place.setId(rs.getInt("id"));
        place.setName(rs.getString("name"));
        place.setAddress(rs.getString("address"));
        place.setAddresscode(rs.getString("addresscode"));
        place.setEstado(rs.getInt("estado"));
        return place;
    };

    // Create Place
    public void createPlace(Place place) {
        String sql = "CALL createPlace(?, ?, ?)";
        template.update(sql, place.getName(), place.getAddress(), place.getAddresscode());
    }

    // Update Place
    public void updatePlace(Place place) {
        String sql = "CALL updatePlace(?, ?, ?, ?)";
        template.update(sql, place.getId(), place.getName(), place.getAddress(), place.getAddresscode());
    }

    // Soft Delete Place
    public void deletePlace(int placeId) {
        String sql = "CALL deletePlace(?)";
        template.update(sql, placeId);
    }

    // Get Place by ID
    public Place getPlace(int placeId) {
        String sql = "CALL getPlace(?)";
        return template.queryForObject(sql, new Object[]{placeId}, placeRowMapper);
    }

    // Get All Active Places
    public List<Place> getAllPlaces() {
        String sql = "CALL getAllPlaces()";
        return template.query(sql, placeRowMapper);
    }

    // Search Places by Name or Address
    public List<Place> searchPlaces(String searchTerm) {
        String sql = "CALL searchPlaces(?)";
        return template.query(sql, new Object[]{"%" + searchTerm + "%"}, placeRowMapper);
    }
}
