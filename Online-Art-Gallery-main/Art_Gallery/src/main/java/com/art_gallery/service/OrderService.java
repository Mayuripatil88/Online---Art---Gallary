package com.art_gallery.service;

import com.art_gallery.entity.Order;
import com.art_gallery.entity.User;

import java.util.List;

public interface OrderService {
    List<Order> findAll();
    Order findById(Integer id);
    List<Order> findByUser(User user);
    Order create(Order order);
    Order update(Integer id, Order order);
    void delete(Integer id);
    Order updateStatus(Integer id, Order.Status status);
    long count();
    long countByStatus(Order.Status status);
}

