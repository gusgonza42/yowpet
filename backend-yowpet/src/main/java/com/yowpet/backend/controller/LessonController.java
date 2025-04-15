package com.yowpet.backend.controller;

import com.yowpet.backend.model.Lesson;
import com.yowpet.backend.service.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yowpet/lesson")
public class LessonController {
    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable int id) {
        return lessonService.getLessonById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Lesson>> searchLesson(@RequestParam("query") String query) {
        return lessonService.searchLesson(query);
    }

    @PostMapping("/create")
    public ResponseEntity<Lesson> createLesson(@RequestBody Lesson lesson) {
        return lessonService.createLesson(lesson);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable int id, @RequestBody Lesson lesson) {
        return lessonService.updateLesson(id, lesson);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Lesson> deleteLesson(@PathVariable int id) {
        return lessonService.deleteLesson(id);
    }
}
