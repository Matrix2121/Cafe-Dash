package com.cafe.backend.dto;

import com.cafe.backend.enums.ProductTypeEnum;
import lombok.Builder;

/**
 * @author AngelStoynov
 */

@Builder
public record ProductDTO(
        Long id,
        String name,
        double price,
        ProductTypeEnum productType,
        String imageUrl,
        Long cafeteriaId
) {}
