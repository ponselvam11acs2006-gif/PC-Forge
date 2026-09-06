package com.pcforge.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard/analytics")
    public ResponseEntity<Map<String, Object>> getDashboardAnalytics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalUsers", 1420);
        metrics.put("totalOrders", 384);
        metrics.put("totalRevenue", 12480500.00);
        metrics.put("totalProducts", 11);
        metrics.put("lowStockProducts", 2);
        metrics.put("pendingOrders", 14);
        metrics.put("successfulPayments", 368);
        metrics.put("failedPayments", 16);

        metrics.put("salesByMonth", Arrays.asList(
                Map.of("month", "Jan", "revenue", 1200000),
                Map.of("month", "Feb", "revenue", 1850000),
                Map.of("month", "Mar", "revenue", 2400000),
                Map.of("month", "Apr", "revenue", 3100000),
                Map.of("month", "May", "revenue", 3930500)
        ));

        metrics.put("ordersByStatus", Map.of(
                "DELIVERED", 280,
                "SHIPPED", 42,
                "PROCESSING", 28,
                "CANCELLED", 24,
                "FAILED", 10
        ));

        return ResponseEntity.ok(metrics);
    }
}
