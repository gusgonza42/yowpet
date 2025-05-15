package com.yowpet.backend.service;

import com.yowpet.backend.model.Lesson;
import com.yowpet.backend.repository.LessonRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {
    private final LessonRepo lessonRepository;

    public LessonService(LessonRepo lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    //GET all lessons
    public ResponseEntity<List<Lesson>> getAllLessons() {
        try {
            List<Lesson> lessons = lessonRepository.getLessonsByEstado(1);
            if (lessons.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(lessons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET lesson by ID
    public ResponseEntity<Lesson> getLessonById(int id) {
        try {
            Lesson lesson = lessonRepository.getLesson(id);
            return ResponseEntity.ok(lesson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET lesson by title or content
    public ResponseEntity<List<Lesson>> searchLesson(String query) {
        try {
            List<Lesson> lessons = lessonRepository.searchLessons(query);
            if (lessons.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(lessons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //POST create lesson
    public ResponseEntity<Lesson> createLesson(Lesson lesson) {
        try {
            lessonRepository.createLesson(lesson);
            return ResponseEntity.status(HttpStatus.CREATED).body(lesson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //PUT update lesson
    public ResponseEntity<Lesson> updateLesson(int id, Lesson updatedLesson) {
        try {
            Lesson existingLesson = lessonRepository.getLesson(id);
            if (existingLesson == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            updatedLesson.setId(id);
            lessonRepository.updateLesson(updatedLesson);
            return ResponseEntity.ok(updatedLesson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //DELETE lesson
    public ResponseEntity<Void> deleteLesson(int id) {
        try {
            Lesson existingLesson = lessonRepository.getLesson(id);
            if (existingLesson == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            existingLesson.setStatus(0);
            lessonRepository.updateLesson(existingLesson);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
