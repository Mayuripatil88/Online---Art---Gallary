package com.art_gallery.serviceImpl;

import com.art_gallery.entity.Artwork;
import com.art_gallery.repository.ArtworkRepository;
import com.art_gallery.service.ArtworkService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ArtworkServiceImpl implements ArtworkService {

    private final ArtworkRepository repo;

    public ArtworkServiceImpl(ArtworkRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Artwork> findAll() {
        return repo.findAll();
    }

    @Override
    public Artwork findById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Artwork not found: " + id));
    }

    @Override
    public Artwork create(Artwork artwork) {
        return repo.save(artwork);
    }

    @Override
    public Artwork update(Integer id, Artwork artwork) {
        Artwork existing = findById(id);

        existing.setTitle(artwork.getTitle());
        existing.setArtist(artwork.getArtist());
        existing.setDescription(artwork.getDescription());
        existing.setPrice(artwork.getPrice());
        existing.setImageUrl(artwork.getImageUrl());
        existing.setCategory(artwork.getCategory());

        return repo.save(existing);
    }

    @Override
    public void delete(Integer id) {
        repo.deleteById(id);
    }

    @Override
    public long count() {
        return repo.count();
    }
}
