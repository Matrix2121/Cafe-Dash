package com.cafe.backend.dto;

/**
 * @author ZapryanZapryanov
 */

public record OrderProductDTO(
        Long id,
        Long orderId,
        Long productId,
        double productPrice,
        int productQuantity
) {}
