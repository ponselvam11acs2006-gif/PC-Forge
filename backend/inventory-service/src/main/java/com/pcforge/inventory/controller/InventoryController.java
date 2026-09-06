package com.pcforge.inventory.controller;

import com.pcforge.inventory.dto.StockOperationRequest;
import com.pcforge.inventory.entity.Inventory;
import com.pcforge.inventory.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<java.util.List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getInventory(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getInventory(productId));
    }

    @PostMapping("/reserve")
    public ResponseEntity<Map<String, Object>> reserveStock(@Valid @RequestBody StockOperationRequest request) {
        boolean success = inventoryService.reserveStock(request.getProductId(), request.getQuantity());

        Map<String, Object> response = new HashMap<>();
        if (success) {
            response.put("success", true);
            response.put("message", "Stock reserved successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Insufficient stock");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping("/release")
    public ResponseEntity<Map<String, Object>> releaseStock(@Valid @RequestBody StockOperationRequest request) {
        inventoryService.releaseStock(request.getProductId(), request.getQuantity());
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Stock released successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, Object>> confirmStock(@Valid @RequestBody StockOperationRequest request) {
        inventoryService.confirmStock(request.getProductId(), request.getQuantity());
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Stock confirmed");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/restore")
    public ResponseEntity<Map<String, Object>> restoreStock(@Valid @RequestBody StockOperationRequest request) {
        inventoryService.restoreStock(request.getProductId(), request.getQuantity());
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Stock restored");
        return ResponseEntity.ok(response);
    }
}
