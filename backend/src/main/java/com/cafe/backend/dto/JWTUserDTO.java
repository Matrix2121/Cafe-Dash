package com.cafe.backend.dto;

import java.util.List;

/**
 * @author ZapryanZapryanov
 */

public record JWTUserDTO(
        Long id,
        String username,
        String password,
        List<String> roles
)
{}
