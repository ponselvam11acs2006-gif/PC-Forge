package com.pcforge.inventory.service;

import com.pcforge.inventory.entity.Inventory;
import com.pcforge.inventory.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory getInventory(Long productId) {
        return inventoryRepository.findById(productId)
                .orElseGet(() -> new Inventory(productId, 0, 0));
    }

    public java.util.List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @Transactional
    public boolean reserveStock(Long productId, Integer quantity) {
        Inventory inventory = inventoryRepository.findByProductIdWithLock(productId)
                .orElseGet(() -> {
                    Inventory newInv = new Inventory(productId, 100, 0);
                    return inventoryRepository.save(newInv);
                });

        if (inventory.getAvailableQuantity() < quantity) {
            return false;
        }

        inventory.setAvailableQuantity(inventory.getAvailableQuantity() - quantity);
        inventory.setReservedQuantity(inventory.getReservedQuantity() + quantity);
        inventory.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inventory);
        return true;
    }

    @Transactional
    public void releaseStock(Long productId, Integer quantity) {
        Inventory inventory = inventoryRepository.findByProductIdWithLock(productId)
                .orElseGet(() -> {
                    Inventory newInv = new Inventory(productId, 100, 0);
                    return inventoryRepository.save(newInv);
                });

        int releaseQty = Math.min(inventory.getReservedQuantity(), quantity);
        inventory.setReservedQuantity(inventory.getReservedQuantity() - releaseQty);
        inventory.setAvailableQuantity(inventory.getAvailableQuantity() + releaseQty);
        inventory.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void confirmStock(Long productId, Integer quantity) {
        Inventory inventory = inventoryRepository.findByProductIdWithLock(productId)
                .orElseGet(() -> {
                    Inventory newInv = new Inventory(productId, 100, 0);
                    return inventoryRepository.save(newInv);
                });

        int confirmQty = Math.min(inventory.getReservedQuantity(), quantity);
        inventory.setReservedQuantity(inventory.getReservedQuantity() - confirmQty);
        inventory.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void restoreStock(Long productId, Integer quantity) {
        Inventory inventory = inventoryRepository.findByProductIdWithLock(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product inventory not found for ID: " + productId));

        inventory.setAvailableQuantity(inventory.getAvailableQuantity() + quantity);
        inventory.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inventory);
    }
}
