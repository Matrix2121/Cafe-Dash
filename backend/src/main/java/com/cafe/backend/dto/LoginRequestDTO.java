package com.cafe.backend.dto;

/**
 * @author ZapryanZapryanov
 */

public record LoginRequestDTO(
		String username,
		String passwordHash
){}
