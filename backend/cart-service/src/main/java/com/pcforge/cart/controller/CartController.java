package com.pcforge.cart.controller;

import com.pcforge.cart.entity.CartItem;
import com.pcforge.cart.repository.CartItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartItemRepository repository;

    public CartController(CartItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getCart(@PathVariable Long userId) {
        List<CartItem> items = repository.findByUserId(userId);

        BigDecimal subtotal = items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal discount = subtotal.compareTo(new BigDecimal("50000")) > 0 ? subtotal.multiply(new BigDecimal("0.05")) : BigDecimal.ZERO;
        BigDecimal tax = subtotal.subtract(discount).multiply(new BigDecimal("0.18"));
        BigDecimal shipping = subtotal.compareTo(BigDecimal.ZERO) == 0 ? BigDecimal.ZERO : (subtotal.compareTo(new BigDecimal("10000")) > 0 ? BigDecimal.ZERO : new BigDecimal("500"));
        BigDecimal grandTotal = subtotal.subtract(discount).add(tax).add(shipping);

        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("items", items);
        response.put("subtotal", subtotal);
        response.put("discount", discount);
        response.put("tax", tax);
        response.put("shipping", shipping);
        response.put("grandTotal", grandTotal);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/items")
    public ResponseEntity<CartItem> addItem(@RequestBody CartItem item) {
        return repository.findByUserIdAndProductId(item.getUserId(), item.getProductId())
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + item.getQuantity());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElseGet(() -> ResponseEntity.ok(repository.save(item)));
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<CartItem> updateItemQuantity(@PathVariable Long id, @RequestParam Integer quantity) {
        return repository.findById(id)
                .map(item -> {
                    item.setQuantity(quantity);
                    return ResponseEntity.ok(repository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}")
    @Transactional
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        repository.deleteByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}
