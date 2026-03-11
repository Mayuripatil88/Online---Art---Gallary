package com.art_gallery.repository;

import com.art_gallery.entity.Order;
import com.art_gallery.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @EntityGraph(attributePaths = {"artwork", "user"})
    @Query("SELECT o FROM Order o WHERE o.user = :user ORDER BY o.createdAt DESC")
    List<Order> findByUserOrderByCreatedAtDesc(@Param("user") User user);
    
    @EntityGraph(attributePaths = {"artwork", "user"})
    @Query("SELECT o FROM Order o ORDER BY o.createdAt DESC")
    @Override
    List<Order> findAll();
    
    @EntityGraph(attributePaths = {"artwork", "user"})
    @Query("SELECT o FROM Order o WHERE o.id = :id")
    @Override
    Optional<Order> findById(@Param("id") Integer id);
    
    long countByStatus(Order.Status status);
}
