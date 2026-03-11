package com.art_gallery.controller;

import com.art_gallery.entity.User;
import com.art_gallery.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Integer id) {
        Optional<User> user = service.findById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User created = service.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            
            if (email == null || email.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email is required");
                error.put("message", "Email is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (password == null || password.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Password is required");
                error.put("message", "Password is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            User user = service.login(email, password);
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", "token_" + user.getId()); // Simple token for demo
            response.put("role", user.getRole().name());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        User created = service.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Integer id, @RequestBody User user) {
        User updated = service.update(id, user);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
