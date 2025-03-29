package com.cafe.backend.dto;

import java.util.Set;
import java.util.List;

/**
 * @author AngelStoynov
 */
public record UserDTO(
        Long id,
        String username,
        String email,
        Set<RoleDTO> role,
        List<OrderDTO> orders,
        Set<ReviewDTO> reviews
) {}
