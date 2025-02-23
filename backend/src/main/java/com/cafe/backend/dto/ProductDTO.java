package com.cafe.backend.dto;

import com.cafe.backend.enums.ProductType;

/**
 * @author AngelStoynov
 */
public record ProductDTO(
        String name,
        double price,
        int quantity,
        ProductType productType
) { }
