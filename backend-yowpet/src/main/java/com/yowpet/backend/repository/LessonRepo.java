package com.yowpet.backend.repository;

import com.yowpet.backend.model.Lesson;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LessonRepo {

    private final JdbcTemplate jdbcTemplate;

    public LessonRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper for Lesson
    private final RowMapper<Lesson> LessonRowMapper = (rs, rowNum) -> new Lesson(
            rs.getInt("id"),
            rs.getString("title"),
            rs.getString("thumbnail"),
            rs.getString("description"),
            rs.getString("steps"),
            rs.getString("instruction_images"),
            rs.getString("level"),
            rs.getInt("status"),
            rs.getTimestamp("created_at").toLocalDateTime(),
            rs.getTimestamp("updated_at").toLocalDateTime()
    );

    public void createLesson(Lesson lesson) {
        String sql = "INSERT INTO lessons (title, thumbnail, description, steps, instruction_images, level, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, lesson.getTitle(), lesson.getThumbnail(), lesson.getDescription(), lesson.getSteps(),
                lesson.getInstructionImages(), lesson.getLevel(), lesson.getStatus());
    }

    public void updateLesson(Lesson lesson) {
        String sql = "UPDATE lessons SET title = ?, thumbnail = ?, description = ?, steps = ?, instruction_images = ?, level = ?, status = ? WHERE id = ?";
        jdbcTemplate.update(sql, lesson.getTitle(), lesson.getThumbnail(), lesson.getDescription(), lesson.getSteps(),
                lesson.getInstructionImages(), lesson.getLevel(), lesson.getStatus(), lesson.getId());
    }

    public void deleteLesson(int lessonId) {
        String sql = "CALL deleteLesson(?)";
        jdbcTemplate.update(sql, lessonId);
    }

    public Lesson getLesson(int id) {
        String sql = "SELECT * FROM lessons WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, LessonRowMapper, id);
    }

    public List<Lesson> getAllLessons() {
        String sql = "CALL getAllLessons()";
        return jdbcTemplate.query(sql, LessonRowMapper);
    }

    public List<Lesson> searchLessons(String query) {
        String sql = "SELECT * FROM lessons WHERE title LIKE ? OR description LIKE ?";
        String searchQuery = "%" + query + "%";
        return jdbcTemplate.query(sql, LessonRowMapper, searchQuery, searchQuery);
    }

    public List<Lesson> getLessonsByEstado(int estado) {
        String sql = "SELECT * FROM lessons WHERE status = ?";
        return jdbcTemplate.query(sql, LessonRowMapper, estado);
    }
}
