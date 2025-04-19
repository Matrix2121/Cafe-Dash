package com.cafe.backend.dto;

public record ResetPasswordDTO(
		String token,
	    String newPassword,
	    String confirmPassword
) {}
