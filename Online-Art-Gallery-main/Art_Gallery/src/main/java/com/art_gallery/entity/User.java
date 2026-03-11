package com.art_gallery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "users")
@Data
public class User {

    public enum Role { customer, admin }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('customer','admin') default 'customer'")
    private Role role = Role.customer;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Order> orders;

    @CreationTimestamp
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
