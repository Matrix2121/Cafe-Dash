package com.cafe.backend.dto;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

/**
 * The {@code CafeteriaDTO} is a Data Transfer Object used to encapsulate data
 * related to a cafeteria entity for both input (creation/update) and output (response).
 *
 * <p>This record is designed to be immutable and is annotated with {@code @Builder}
 * to support fluent object creation using the builder pattern.</p>
 *
 * <p>Fields such as {@code name}, {@code brand}, {@code location}, and {@code phoneNumber}
 * are required for creation. The fields {@code rating} and {@code countReview} are typically initialized
 * to default values (e.g., 0.0, 0) upon creation.</p>
 *
 * <p>The {@code openingHour} and {@code closingHour} fields are formatted using the {@code H:mm} pattern
 * for 24-hour time representation.</p>
 *
 * @param id           The unique identifier of the cafeteria. Should be {@code null} when creating a new cafeteria.
 * @param name         The name of the cafeteria (required).
 * @param brand        The brand or franchise name of the cafeteria (required).
 * @param location     The physical location/address of the cafeteria (required).
 * @param rating       The average rating of the cafeteria, initialized to {@code 0.0} when created.
 * @param countReview  The number of reviews submitted for the cafeteria, typically {@code 0} at creation.
 * @param phoneNumber  The phone number for contacting the cafeteria (required).
 * @param openingHour  The opening hour of the cafeteria, formatted as {@code H:mm}.
 * @param closingHour  The closing hour of the cafeteria, formatted as {@code H:mm}.
 * @param imageUrl     A link to an image representing the cafeteria (optional).
 *
 * @author AngelStoynov
 */

@Builder
public record CafeteriaDTO(
        Long id,
        String name,
        String brand,
        String location,
        double rating,
        int countReview,
        String phoneNumber,
        @JsonFormat(pattern = "H:mm") LocalTime openingHour,
        @JsonFormat(pattern = "H:mm") LocalTime closingHour,
        String imageUrl
) { }