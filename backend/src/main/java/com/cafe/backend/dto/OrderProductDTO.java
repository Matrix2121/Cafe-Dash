package com.cafe.backend.dto;

/**
 * The {@code OrderProductDTO} is a Data Transfer Object that represents the association
 * between an order and a specific product.
 *
 * <p>This DTO is used to describe the individual products included in an order,
 * along with their quantity and price at the time of ordering.</p>
 *
 * @param id              The unique identifier of this order-product entry.
 * @param orderId         The ID of the associated order.
 * @param productId       The ID of the product included in the order.
 * @param productPrice    The price of the product at the time the order was placed.
 * @param productQuantity The quantity of this product included in the order.
 *
 * @author ZapryanZapryanov
 */
public record OrderProductDTO(
        Long id,
        Long orderId,
        Long productId,
        double productPrice,
        int productQuantity
) {}