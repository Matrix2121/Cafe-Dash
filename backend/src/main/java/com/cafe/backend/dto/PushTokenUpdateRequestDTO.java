package com.cafe.backend.dto;

public record PushTokenUpdateRequestDTO(
    Long userId,
    String pushToken
) {}