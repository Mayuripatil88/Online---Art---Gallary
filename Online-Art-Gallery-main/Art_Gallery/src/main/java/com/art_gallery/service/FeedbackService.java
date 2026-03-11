package com.art_gallery.service;

import com.art_gallery.entity.Feedback;
import java.util.List;

public interface FeedbackService {
    List<Feedback> findAll();
    Feedback findById(Integer id);
    Feedback create(Feedback feedback);
    void delete(Integer id);
}

