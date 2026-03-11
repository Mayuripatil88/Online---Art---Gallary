package com.art_gallery.controller;

import com.art_gallery.entity.Feedback;
import com.art_gallery.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @GetMapping
    public List<Feedback> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getById(@PathVariable Integer id) {
        try {
            Feedback feedback = service.findById(id);
            return ResponseEntity.ok(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Feedback> create(@RequestBody Feedback feedback) {
        Feedback created = service.create(feedback);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
