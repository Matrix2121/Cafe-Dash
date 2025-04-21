package com.cafe.backend.dto;

import java.util.Set;


/**
 * Data transfer object (DTO) for registering a new user.
 * This record holds the necessary information to register a user, including
 * the username, email, password hash, and the roles assigned to the user.
 */
public record RegisterUserDTO(
		String username,
		String email,
		String passwordHash,
		Set<String> roleNames
) {}