 package com.art_gallery.serviceImpl;

import com.art_gallery.entity.Feedback;
import com.art_gallery.repository.FeedbackRepository;
import com.art_gallery.service.FeedbackService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository repo;

    public FeedbackServiceImpl(FeedbackRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Feedback> findAll() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Feedback findById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found: " + id));
    }

    @Override
    public Feedback create(Feedback feedback) {
        return repo.save(feedback);
    }

    @Override
    public void delete(Integer id) {
        repo.deleteById(id);
    }
}
