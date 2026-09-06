package com.pcforge.wishlist.controller;

import com.pcforge.wishlist.entity.WishlistItem;
import com.pcforge.wishlist.repository.WishlistRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistRepository repository;

    public WishlistController(WishlistRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItem>> getWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(repository.findByUserId(userId));
    }

    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<WishlistItem> addToWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return repository.findByUserIdAndProductId(userId, productId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(repository.save(new WishlistItem(userId, productId))));
    }

    @DeleteMapping("/{userId}/{productId}")
    @Transactional
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        repository.deleteByUserIdAndProductId(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
