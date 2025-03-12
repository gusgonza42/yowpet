package com.yowpet.backend.repository;

import com.yowpet.backend.model.Lesson_reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Lesson_reviewRepo {

    @Autowired
    private JdbcTemplate template;

    // RowMapper for Lesson_reviews
    private final RowMapper<Lesson_reviews> lessonReviewsRowMapper = (rs, rowNum) -> {
        Lesson_reviews review = new Lesson_reviews();
        review.setId(rs.getInt("id"));
        review.setLesson(rs.getInt("lesson_id"));
        review.setUser(rs.getInt("user_id"));
        review.setRating(rs.getDouble("rating"));
        review.setComment(rs.getString("comment"));
        review.setEstado(rs.getInt("estado"));
        return review;
    };

    public List<Lesson_reviews> getAllLessonReviews() {
        String sql = "CALL GetAllLessonReviews()";
        return template.query(sql, lessonReviewsRowMapper);
    }

    public Lesson_reviews getLessonReviewById(int reviewId) {
        String sql = "CALL GetLessonReviewById(?)";
        return template.queryForObject(sql, new Object[]{reviewId}, lessonReviewsRowMapper);
    }

    public List<Lesson_reviews> searchLessonReviewsByRating(double rating) {
        String sql = "CALL SearchLessonReviewsByRating(?)";
        return template.query(sql, new Object[]{rating}, lessonReviewsRowMapper);
    }

    public void createLessonReview(Lesson_reviews review) {
        String sql = "CALL CreateLessonReview(?, ?, ?, ?)";
        template.update(sql, review.getLesson(), review.getUser(), review.getRating(), review.getComment());
    }

    public void updateLessonReview(Lesson_reviews review) {
        String sql = "CALL UpdateLessonReview(?, ?, ?, ?)";
        template.update(sql, review.getId(), review.getRating(), review.getComment(), review.getEstado());
    }

    public void deleteLessonReview(int reviewId) {
        String sql = "CALL SoftDeleteLessonReview(?)";
        template.update(sql, reviewId);
    }
}
