package com.art_gallery.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "feedback")
@Data
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CreationTimestamp
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
