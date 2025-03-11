package com.cafe.backend.dto;

import com.cafe.backend.enums.DeliveryStatusEnum;

/**
 * @author AngelStoynov
 */
public record CafeteriaDTO(
        Long id,
        String name,
        String brand,
        String location,
        double rating,
        String phoneNumber,
        DeliveryStatusEnum cafeteriaDeliveryStatus
) { }
