package com.cafe.backend.dto;

import com.cafe.backend.enums.OrderStatusEnum;

/**
 * Data transfer object (DTO) representing the status of an order.
 * This record holds the order status from the {@link OrderStatusEnum}.
 * @author AngelStoynov
 */
public record OrderStatusDTO(OrderStatusEnum orderStatusEnum) {
}
