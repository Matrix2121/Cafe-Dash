package com.cafe.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cafe.backend.entity.passwordReset.PasswordResetToken;
import org.springframework.stereotype.Repository;

/**
 * {@code PasswordResetTokenRepository} is a repository interface for accessing and managing {@code PasswordResetToken} entities.
 * It extends {@code JpaRepository}, providing basic CRUD operations and query methods for {@code PasswordResetToken}.
 * <p>
 * This repository interface allows for the interaction with the {@code reset_token} table in the database, specifically
 * handling operations related to password reset tokens.
 * </p>
 *
 * @author ZapryanZapryanov
 */

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    /**
     * Finds a {@code PasswordResetToken} by its token value.
     *
     * @param token the token value to search for.
     * @return the {@code PasswordResetToken} associated with the given token.
     */
    PasswordResetToken findByToken(String token);
}
