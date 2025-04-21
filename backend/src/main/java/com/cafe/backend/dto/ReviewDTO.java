package com.cafe.backend.dto;

import java.time.LocalDateTime;


/**
 * Data transfer object (DTO) representing a review.
 * This record holds the details of a review, including:
 * - The review's unique identifier {@code id}.
 * - The review's title {@code title}.
 * - The content of the review {@code body}.
 * - The rating given in the review {@code rating}.
 * - The timestamp when the review was created {@code createdAt}.
 * - The identifier of the user who created the review {@code userId}.
 * - The identifier of the cafeteria being reviewed {@code cafeteriaId}.
 *
 * @author VasilStoykov
 */
public record ReviewDTO(
        Long id,
        String title,
        String body,
        Integer rating,
        LocalDateTime createdAt,
        Long userId,
        Long cafeteriaId
) {}