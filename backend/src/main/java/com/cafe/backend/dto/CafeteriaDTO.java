package com.cafe.backend.dto;

import com.cafe.backend.enums.DeliveryStatusEnum;
import java.util.Set;

/**
 * @author AngelStoynov
 */
public record CafeteriaDTO(
        Long id,
        String name,
        String location,
        double rating,
        String phoneNumber,
        DeliveryStatusEnum cafeteriaDeliveryStatus,
        Set<ProductDTO> products
) { }
