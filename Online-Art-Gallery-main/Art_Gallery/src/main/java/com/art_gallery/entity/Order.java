package com.art_gallery.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "orders")
@Data
public class Order {

    public enum Status {
        pending, approved, rejected, shipped, delivered
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"orders", "password"})
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "artwork_id", nullable = false)
   // @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Artwork artwork;

    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('pending','approved','rejected','shipped','delivered') default 'pending'")
    private Status status = Status.pending;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CreationTimestamp
    protected void onCreate() {
        if (orderDate == null) {
            orderDate = LocalDate.now();
        }
        createdAt = LocalDateTime.now();
    }
}
