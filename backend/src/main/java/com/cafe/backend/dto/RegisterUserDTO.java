package com.cafe.backend.dto;

import java.util.Set;

public record RegisterUserDTO(
	    Long id,
	    String username,
	    String email,
	    String passwordHash,
	    Set<RoleDTO> roles
) {}
