package com.yowpet.backend.repository;

import com.yowpet.backend.model.Lesson_reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Lesson_reviewRepo {

    @Autowired
    private JdbcTemplate template;

    public List<Lesson_reviews> getAllLessonReviews() {
        String sql = "CALL GetAllLessonReviews()";
        return template.query(sql, new BeanPropertyRowMapper<>(Lesson_reviews.class));
    }

    public Lesson_reviews getLessonReviewById(int reviewId) {
        String sql = "CALL GetLessonReviewById(?)";
        return template.queryForObject(sql, new Object[]{reviewId}, new BeanPropertyRowMapper<>(Lesson_reviews.class));
    }

    public List<Lesson_reviews> searchLessonReviewsByRating(double rating) {
        String sql = "CALL SearchLessonReviewsByRating(?)";
        return template.query(sql, new Object[]{rating}, new BeanPropertyRowMapper<>(Lesson_reviews.class));
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
