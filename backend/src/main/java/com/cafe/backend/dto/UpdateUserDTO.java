package com.cafe.backend.dto;

import java.util.List;

/**
 * @author AngelStoynov
 */
public record UpdateUserDTO(
        Long id,
        String username,
        String email,
        List<String> roles
) {}
