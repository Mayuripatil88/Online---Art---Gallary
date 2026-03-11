package com.art_gallery.repository;

import com.art_gallery.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findAllByOrderByCreatedAtDesc();
}
