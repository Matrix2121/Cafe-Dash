package com.cafe.backend.dto;

import com.cafe.backend.enums.OrderStatusEnum;
import java.time.LocalDateTime;
import java.util.List;

/**
 * The {@code OrderDTO} is a Data Transfer Object used to represent order data
 * exchanged between the backend and frontend.
 *
 * <p>It encapsulates information about the order, such as its status, discount,
 * pricing details, associated user and cafeteria, and the list of products within the order.</p>
 *
 * @param id               The unique identifier of the order.
 * @param discount         The applied discount in percentage; typically {@code 0} when creating a new order.
 * @param readyPickupTime  The expected pickup time for the order; required during order creation.
 * @param status           The current status of the order; typically set to {@code PROCESSING} on creation.
 * @param tip              The optional tip amount provided by the user; {@code 0.0} by default.
 * @param cafeteriaId      The ID of the cafeteria where the order was placed.
 * @param userId           The ID of the user who created the order.
 * @param totalPrice       The total calculated price for the order, including discounts and tip.
 * @param orderProducts    A list of {@link OrderProductDTO} representing the individual products in the order.
 *
 * @author ZapryanZapryanov
 */
public record OrderDTO(
        Long id,
        int discount,
        LocalDateTime readyPickupTime,
        OrderStatusEnum status,
        double tip,
        Long cafeteriaId,
        Long userId,
        double totalPrice,
        List<OrderProductDTO> orderProducts
) {}