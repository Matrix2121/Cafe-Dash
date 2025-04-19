package com.cafe.backend.service;

public interface EmailService {
	void sendPasswordResetEmail(String to, String resetLink);
}
