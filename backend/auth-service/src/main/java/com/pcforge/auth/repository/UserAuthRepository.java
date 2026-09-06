package com.pcforge.auth.repository;

import com.pcforge.auth.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {
    Optional<UserAuth> findByEmail(String email);
    Optional<UserAuth> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
