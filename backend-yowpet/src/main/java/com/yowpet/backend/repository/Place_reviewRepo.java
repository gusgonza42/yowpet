package com.yowpet.backend.repository;

import com.yowpet.backend.model.Place_reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Place_reviewRepo {

    @Autowired
    private JdbcTemplate template;

    // Create Place_reviews
    public void createPlace_reviews(Place_reviews review) {
        String sql = "CALL createPlaceReview(?, ?, ?, ?)";
        template.update(sql, review.getRating(), review.getComment(), review.getPlace(), review.getUser());
    }

    // Update Place_reviews
    public void updatePlace_reviews(Place_reviews review) {
        String sql = "CALL updatePlaceReview(?, ?, ?, ?)";
        template.update(sql, review.getId(), review.getRating(), review.getComment(), review.getEstado());
    }

    // Soft Delete Place_reviews
    public void deletePlace_reviews(int placeId) {
        String sql = "CALL deletePlaceReview(?)";
        template.update(sql, placeId);
    }

    // Get Place_reviews by ID
    public Place_reviews getPlace_review(int placeId) {
        String sql = "CALL getPlaceReview(?)";
        return template.queryForObject(sql, new Object[]{placeId}, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    // Get All Active Place_reviewss
    public List<Place_reviews> getAllPlace_reviews() {
        String sql = "CALL getAllPlaceReviews()";
        return template.query(sql, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    // Search Place_reviewss by Name or Address
   /* public List<Place_reviews> searchPlace_reviewss(String searchTerm) {
        String sql = "CALL searchPlaceReviews(?)";
        return template.query(sql, new Object[]{"%" + searchTerm + "%"}, new BeanPropertyRowMapper<>(Place_reviews.class));
    }*/

    public List<Place_reviews> getPlace_reviewsByPlace(int placeId) {
        String sql = "CALL getPlaceReviewsByPlace(?)";
        return template.query(sql, new Object[]{placeId}, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    public List<Place_reviews> getPlace_reviewsByUser(int userId) {
        String sql = "CALL getPlaceReviewsByUser(?)";
        return template.query(sql, new Object[]{userId}, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    public List<Place_reviews> getPlace_reviewsByPlaceAndUser(int placeId, int userId) {
        String sql = "CALL getPlaceReviewsByPlaceAndUser(?, ?)";
        return template.query(sql, new Object[]{placeId, userId}, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    public List<Place_reviews> getPlace_reviewsbyRating(double rating) {

        String sql = "CALL getPlaceReviewsByRating(?)";
        return template.query(sql, new Object[]{rating}, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    public List<Place_reviews> getPlace_reviewsbyidandEstado(int Id, int estado) {

        String sql = "CALL getPlaceReviewsByIdandEstado(?, ?)";
        return template.query(sql, new Object[]{estado}, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    public List<Place_reviews> findAllByEstadoNot() {
        String sql = "CALL getAllPlaceReviews()";
        return template.query(sql, new BeanPropertyRowMapper<>(Place_reviews.class));
    }

    public Place_reviews findByIdAndEstadoNot(int id, int estado) {
        String sql = "CALL getPlaceReviewsByUser(?)";
        List<Place_reviews> result = template.query(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Place_reviews.class));
        return result.isEmpty() ? null : result.get(0);
    }
}
