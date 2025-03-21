package com.cafe.backend.dto;

import java.time.LocalDateTime;

/**
 * @author VasilStoykov
 */

public record ReviewDTO(
    Long id,
    String title,
    String body,
    Byte rating,
    LocalDateTime createdAt,
    Long userId,
    Long cafeteriaId
) {}