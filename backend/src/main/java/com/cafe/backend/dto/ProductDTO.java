package com.cafe.backend.dto;

import com.cafe.backend.enums.ProductType;

/**
 * @author AngelStoynov
 */
public record ProductDTO(
        Long id,
        String name,
        double price,
        int quantity,
        ProductType productType
) { }
