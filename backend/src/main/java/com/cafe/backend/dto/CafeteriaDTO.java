package com.cafe.backend.dto;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

/**
 * @author AngelStoynov
 */

@Builder
public record CafeteriaDTO(
        Long id, // null for creation
        String name, // required for creation
        String brand, // required for creation
        String location, // required for creation
        double rating, // 0.0 for creation
        int countReview, // 0 required for creation
        String phoneNumber, // required for creation
        String imageUrl,
        @JsonFormat(pattern = "H:mm") LocalTime openingHour,
        @JsonFormat(pattern = "H:mm") LocalTime closingHour
) { }
