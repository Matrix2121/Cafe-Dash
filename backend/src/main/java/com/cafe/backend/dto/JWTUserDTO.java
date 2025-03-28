package com.cafe.backend.dto;

import java.util.Set;

/**
 * @author ZapryanZapryanov
 */

public record JWTUserDTO(
        Long id,
        String username,
        String password,
        Set<String> roles
)
{}
