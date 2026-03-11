package com.art_gallery.controller;

import com.art_gallery.entity.Order;
import com.art_gallery.service.ArtworkService;
import com.art_gallery.service.OrderService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final ArtworkService artworkService;
    private final OrderService orderService;

    public DashboardController(ArtworkService artworkService, OrderService orderService) {
        this.artworkService = artworkService;
        this.orderService = orderService;
    }

    @GetMapping("/metrics")
    public Map<String, Long> getMetrics() {
        long totalArtworks = artworkService.count();
        long totalOrders = orderService.count();
        long pendingOrders = orderService.countByStatus(Order.Status.pending);

        return Map.of(
                "totalArtworks", totalArtworks,
                "totalOrders", totalOrders,
                "pendingOrders", pendingOrders
        );
    }
}


