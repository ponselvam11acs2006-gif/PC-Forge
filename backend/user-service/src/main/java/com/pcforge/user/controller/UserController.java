package com.pcforge.user.controller;

import com.pcforge.user.entity.UserProfile;
import com.pcforge.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    UserProfile profile = new UserProfile();
                    profile.setId(id);
                    profile.setFullName("Gamer User");
                    return ResponseEntity.ok(profile);
                });
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateProfile(@PathVariable Long id, @RequestBody UserProfile profile) {
        profile.setId(id);
        return ResponseEntity.ok(repository.save(profile));
    }
}
