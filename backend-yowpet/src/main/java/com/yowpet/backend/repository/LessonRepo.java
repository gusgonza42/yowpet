package com.yowpet.backend.repository;

import com.yowpet.backend.model.Lesson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LessonRepo {

    @Autowired
    private JdbcTemplate template;

    // RowMapper for Lesson
    private final RowMapper<Lesson> LessonRowMapper = (rs, rowNum) -> {
        Lesson lesson = new Lesson();
        lesson.setId(rs.getInt("id"));
        lesson.setTitle(rs.getString("title"));
        lesson.setContent(rs.getString("content"));
        lesson.setEstado(rs.getInt("estado"));
        return lesson;
    };

    public void createLesson(Lesson lesson) {
        String sql = "CALL createLesson(?, ?, ?)";
        template.update(sql, lesson.getTitle(), lesson.getContent(), lesson.getEstado());
    }

    public void updateLesson(Lesson lesson) {
        String sql = "CALL updateLesson(?, ?, ?, ?)";
        template.update(sql, lesson.getId(), lesson.getTitle(), lesson.getContent(), lesson.getEstado());
    }

    public void deleteLesson(int lessonId) {
        String sql = "CALL deleteLesson(?)";
        template.update(sql, lessonId);
    }

    public Lesson getLesson(int lessonId ) {
        String sql = "CALL getLesson(?)";
        return template.queryForObject(sql, new Integer[]{lessonId},LessonRowMapper);
    }
    public Lesson getLessonbyID(int lessonId ) {
        String sql = "CALL getLessonbyID(?)";
        return template.queryForObject(sql, new Integer[]{lessonId},LessonRowMapper);
    }

    public List<Lesson> getAllLessons() {
        String sql = "CALL getAllLessons()";
        return template.query(sql, LessonRowMapper);
    }

    public List<Lesson> searchLessons(String searchTerm) {
        String sql = "CALL searchLessons(?)";
        return template.query(sql, new Object[]{"%" + searchTerm + "%"}, LessonRowMapper);
    }

    public List<Lesson> getLessonsByEstado(int estado) {
        String sql = "CALL getLessonsByEstado(?)";
        return template.query(sql, new Object[]{estado}, LessonRowMapper);
    }
}
