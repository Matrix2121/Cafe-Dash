package com.cafe.backend.dto;

/**
 * The {@code LoginRequestDTO} is a Data Transfer Object used for user authentication requests.
 *
 * <p>It is typically sent from the client to the backend during the login process
 * and contains the credentials required for user authentication.</p>
 *
 * @param username     The username entered by the user during login.
 * @param passwordHash The hashed or raw password provided for authentication.
 *
 * @author ZapryanZapryanov
 */
public record LoginRequestDTO(
		String username,
		String passwordHash
) {}