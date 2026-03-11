package com.art_gallery.controller;

import com.art_gallery.entity.Artwork;
import com.art_gallery.service.ArtworkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artworks")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtworkController {

    private final ArtworkService service;

    public ArtworkController(ArtworkService service) {
        this.service = service;
    }

    // READ all
    @GetMapping
    public List<Artwork> getAll() {
        return service.findAll();
    }

    // READ by id
    @GetMapping("/{id}")
    public Artwork getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    // CREATE
    @PostMapping
    public Artwork create(@RequestBody Artwork artwork) {
        return service.create(artwork);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Artwork update(@PathVariable Integer id, @RequestBody Artwork artwork) {
        return service.update(id, artwork);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
