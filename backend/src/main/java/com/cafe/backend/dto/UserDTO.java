package com.cafe.backend.dto;

import java.util.List;

/**
 * @author AngelStoynov
 */
public record UserDTO(
        Long id,
        String username,
        String email,
        List<RoleDTO> roles,
        List<OrderDTO> orders,
        List<ReviewDTO> reviews
) {}
