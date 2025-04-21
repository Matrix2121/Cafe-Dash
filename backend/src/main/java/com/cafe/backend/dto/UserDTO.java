package com.cafe.backend.dto;

import java.util.List;


/**
 * Data transfer object (DTO) representing a user.
 * This record holds the details of a user, including:
 * - The user's unique identifier {@code id}.
 * - The user's username {@code username}.
 * - The user's email address {@code email}.
 * - The list of roles assigned to the user {@code roles}.
 * - The list of orders placed by the user {@code orders}.
 * - The list of reviews written by the user {@code reviews}.
 *
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