package com.cafe.backend.dto;

/**
 * @author AngelStoynov
 */
public record CafeteriaDTO(
        Long id,
        String name,
        String brand,
        String location,
        double rating,
        int countReview,
        String phoneNumber
) { }
