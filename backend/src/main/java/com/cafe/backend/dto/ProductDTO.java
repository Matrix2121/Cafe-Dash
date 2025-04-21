package com.cafe.backend.dto;

import com.cafe.backend.enums.ProductTypeEnum;
import lombok.Builder;

/**
 * The {@code ProductDTO} is a Data Transfer Object that encapsulates data related to a product
 * offered in a cafeteria.
 *
 * <p>This DTO is used for transferring product data between the backend and frontend during
 * creation, listing, and editing of products.</p>
 *
 * @param id           The unique identifier of the product.
 * @param name         The name of the product.
 * @param price        The price of the product.
 * @param productType  The category or type of the product, defined by {@link ProductTypeEnum}.
 * @param imageUrl     A URL pointing to an image representing the product (optional).
 * @param cafeteriaId  The ID of the cafeteria that offers this product.
 *
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