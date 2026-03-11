package com.art_gallery.controller;

import com.art_gallery.entity.Artwork;
import com.art_gallery.entity.Order;
import com.art_gallery.entity.User;
import com.art_gallery.service.ArtworkService;
import com.art_gallery.service.OrderService;
import com.art_gallery.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final ArtworkService artworkService;

    public OrderController(OrderService orderService, UserService userService, ArtworkService artworkService) {
        this.orderService = orderService;
        this.userService = userService;
        this.artworkService = artworkService;
    }

    @GetMapping
    public List<Order> getAll() {
        return orderService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Integer id) {
        try {
            Order order = orderService.findById(id);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getByUser(@PathVariable Integer userId) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Order> orders = orderService.findByUser(userOpt.get());
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Order order) {
        try {
            Integer userId = order.getUser() != null ? order.getUser().getId() : null;
            Integer artworkId = order.getArtwork() != null ? order.getArtwork().getId() : null;

            if (userId == null || artworkId == null) {
                throw new IllegalArgumentException("User ID and Artwork ID are required to place an order");
            }

            User user = userService.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            Artwork artwork = artworkService.findById(artworkId);

            order.setUser(user);
            order.setArtwork(artwork);

            Order created = orderService.create(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Order order) {
        try {
            Integer userId = order.getUser() != null ? order.getUser().getId() : null;
            Integer artworkId = order.getArtwork() != null ? order.getArtwork().getId() : null;

            if (userId == null || artworkId == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "User ID and Artwork ID are required"));
            }

            User user = userService.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            Artwork artwork = artworkService.findById(artworkId);

            order.setUser(user);
            order.setArtwork(artwork);

            Order updated = orderService.update(id, order);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        try {
            String statusStr = body.get("status");
            Order.Status status = Order.Status.valueOf(statusStr);
            Order updated = orderService.updateStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        try {
            orderService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
