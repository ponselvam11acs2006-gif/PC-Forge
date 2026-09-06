package com.pcforge.category.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getCategories() {
        List<Map<String, Object>> categories = Arrays.asList(
                Map.of("id", 1L, "code", "CPU", "name", "Processors (CPU)", "icon", "Cpu"),
                Map.of("id", 2L, "code", "GPU", "name", "Graphics Cards (GPU)", "icon", "Tv"),
                Map.of("id", 3L, "code", "MOTHERBOARD", "name", "Motherboards", "icon", "CircuitBoard"),
                Map.of("id", 4L, "code", "RAM", "name", "Memory (RAM)", "icon", "HardDrive"),
                Map.of("id", 5L, "code", "SSD", "name", "Storage (SSD/NVMe)", "icon", "Database"),
                Map.of("id", 6L, "code", "PSU", "name", "Power Supplies (PSU)", "icon", "Zap"),
                Map.of("id", 7L, "code", "CABINET", "name", "Cases & Cabinets", "icon", "Box"),
                Map.of("id", 8L, "code", "MONITOR", "name", "Gaming Monitors", "icon", "Monitor"),
                Map.of("id", 9L, "code", "KEYBOARD", "name", "Mechanical Keyboards", "icon", "Keyboard"),
                Map.of("id", 10L, "code", "MOUSE", "name", "Gaming Mice", "icon", "Mouse"),
                Map.of("id", 11L, "code", "HEADSET", "name", "Gaming Headsets", "icon", "Headphones")
        );
        return ResponseEntity.ok(categories);
    }
}
