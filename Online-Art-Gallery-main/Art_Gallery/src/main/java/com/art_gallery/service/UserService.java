package com.art_gallery.service;

import com.art_gallery.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Integer id);
    Optional<User> findByEmail(String email);
    User create(User user);
    User update(Integer id, User user);
    void delete(Integer id);
    User register(User user);
    User login(String email, String password);
    boolean existsByEmail(String email);
}

