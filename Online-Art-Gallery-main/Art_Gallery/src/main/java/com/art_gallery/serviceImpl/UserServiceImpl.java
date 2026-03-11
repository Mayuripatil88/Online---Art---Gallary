package com.art_gallery.serviceImpl;

import com.art_gallery.entity.User;
import com.art_gallery.repository.UserRepository;
import com.art_gallery.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<User> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<User> findById(Integer id) {
        return repo.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    @Override
    public User create(User user) {
        return repo.save(user);
    }

    @Override
    public User update(Integer id, User user) {
        User existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        
        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existing.setPassword(user.getPassword());
        }
        if (user.getRole() != null) {
            existing.setRole(user.getRole());
        }
        
        return repo.save(existing);
    }

    @Override
    public void delete(Integer id) {
        repo.deleteById(id);
    }

    @Override
    public User register(User user) {
        if (repo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        user.setRole(User.Role.customer);
        return repo.save(user);
    }

    @Override
    public User login(String email, String password) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }
        
        return user;
    }

    @Override
    public boolean existsByEmail(String email) {
        return repo.existsByEmail(email);
    }
}
