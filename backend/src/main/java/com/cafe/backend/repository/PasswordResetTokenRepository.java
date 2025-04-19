package com.cafe.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cafe.backend.entity.passwordReset.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
}
