package com.cafe.backend.dto;

import java.util.Set;

public record JWTUserDTO(
        String username,
        String password,
        Set<String> roles
)
{}
