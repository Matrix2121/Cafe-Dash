package com.cafe.backend.dto;

import java.util.Set;

public record RegisterUserDTO(
	    String username,
	    String email,
	    String passwordHash,
	    Set<String> roleNames
) {}
