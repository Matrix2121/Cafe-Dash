package com.cafe.backend.dto;

import java.util.List;

/**
 * The {@code UpdateUserDTO} is a Data Transfer Object used for updating user account information.
 *
 * <p>It encapsulates the editable fields of a user, such as username, email, and assigned roles,
 * typically used by administrators or profile management endpoints.</p>
 *
 * @param id        The unique identifier of the user to be updated.
 * @param username  The new or updated username.
 * @param email     The new or updated email address.
 * @param roles     A list of role names assigned to the user.
 *
 * @author AngelStoynov
 */
public record UpdateUserDTO(
        Long id,
        String username,
        String email,
        List<String> roles
) {}