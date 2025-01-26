package com.yowpet.backend.service;

import com.yowpet.backend.model.Lesson;
import com.yowpet.backend.repository.LessonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {
    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    //GET all lessons
    public ResponseEntity<List<Lesson>> getAllLessons() {
        try {
            List<Lesson> lessons = lessonRepository.findAllByEstadoNot(0);
            if (lessons.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(lessons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET lesson by ID
    public ResponseEntity<Lesson> getLessonById(Long id) {
        try {
            Optional<Lesson> lesson = lessonRepository.findByIdAndEstadoNot(id, 0);
            return lesson.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET lesson by title or content
    public ResponseEntity<List<Lesson>> searchLesson(String query) {
        try {
            List<Lesson> lessons = lessonRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseAndEstadoNot(query, query, 0);
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
            lesson.setId(null);
            Lesson newLesson = lessonRepository.save(lesson);
            return ResponseEntity.status(HttpStatus.CREATED).body(newLesson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //PUT update lesson
    public ResponseEntity<Lesson> updateLesson(Long id, Lesson updatedLesson) {
        try {
            Optional<Lesson> existingLesson = lessonRepository.findById(id);
            if (existingLesson.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Lesson lessonToSave = existingLesson.get();
            lessonToSave.setTitle(updatedLesson.getTitle());
            lessonToSave.setContent(updatedLesson.getContent());
            lessonToSave.setEstado(updatedLesson.getEstado());
            Lesson savedLesson = lessonRepository.save(lessonToSave);
            return ResponseEntity.ok(savedLesson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //DELETE lesson
    public ResponseEntity<Lesson> deleteLesson(Long id) {
        try {
            Optional<Lesson> existingLesson = lessonRepository.findById(id);
            if (existingLesson.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Lesson lessonToDelete = existingLesson.get();
            lessonToDelete.setEstado(0);
            lessonRepository.save(lessonToDelete);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
