package com.cafe.backend.dto;

import java.util.List;

/**
 * The {@code JWTUserDTO} is a Data Transfer Object used to encapsulate user information
 * required for JWT token generation and authentication processes.
 *
 * <p>This DTO is typically used during login, registration, or token decoding,
 * and contains all the necessary data to build the authenticated user context.</p>
 *
 * @param id        The unique identifier of the user.
 * @param username  The username used for login and token identification.
 * @param password  The encoded password of the user.
 * @param roles     A list of role names (as strings) assigned to the user.
 *
 * @author ZapryanZapryanov
 */
public record JWTUserDTO(
        Long id,
        String username,
        String password,
        List<String> roles
) {}

