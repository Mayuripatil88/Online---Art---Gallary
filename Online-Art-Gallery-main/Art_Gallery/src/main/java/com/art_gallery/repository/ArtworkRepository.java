package com.art_gallery.repository;

import com.art_gallery.entity.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtworkRepository extends JpaRepository<Artwork, Integer> {
    // extra query methods can be added here later
}
