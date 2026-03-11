package com.art_gallery.serviceImpl;

import com.art_gallery.entity.Order;
import com.art_gallery.entity.User;
import com.art_gallery.repository.OrderRepository;
import com.art_gallery.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repo;

    public OrderServiceImpl(OrderRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Order> findAll() {
        return repo.findAll();
    }

    @Override
    public Order findById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
    }

    @Override
    public List<Order> findByUser(User user) {
        return repo.findByUserOrderByCreatedAtDesc(user);
    }

    @Override
    public Order create(Order order) {
        return repo.save(order);
    }

    @Override
    public Order update(Integer id, Order order) {
        Order existing = findById(id);
        
        existing.setUser(order.getUser());
        existing.setArtwork(order.getArtwork());
        existing.setOrderDate(order.getOrderDate());
        existing.setStatus(order.getStatus());
        
        return repo.save(existing);
    }

    @Override
    public void delete(Integer id) {
        repo.deleteById(id);
    }

    @Override
    public Order updateStatus(Integer id, Order.Status status) {
        Order order = findById(id);
        order.setStatus(status);
        return repo.save(order);
    }

    @Override
    public long count() {
        return repo.count();
    }

    @Override
    public long countByStatus(Order.Status status) {
        return repo.countByStatus(status);
    }
}
