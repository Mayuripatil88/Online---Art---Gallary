package com.art_gallery.service;

import com.art_gallery.entity.Artwork;

import java.util.List;

public interface ArtworkService {
    List<Artwork> findAll();
    Artwork findById(Integer id);
    Artwork create(Artwork artwork);
    Artwork update(Integer id, Artwork artwork);
    void delete(Integer id);
    long count();
}
