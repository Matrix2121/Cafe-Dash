package com.cafe.backend.dto;

import java.util.Set;

/**
 * @author AngelStoynov
 */
public record UserDTO(
        Long id,
        String username,
        Set<RoleDTO> role,
        Set<OrderDTO> orders
) {}
