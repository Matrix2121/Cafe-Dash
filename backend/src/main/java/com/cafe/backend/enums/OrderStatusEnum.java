package com.cafe.backend.enums;

/**
 * {@code OrderStatusEnum} is an enumeration representing the possible statuses of an order.
 * <p>
 * This enum defines the following statuses for an order:
 * - {@code CANCELLED}: The order has been cancelled.
 * - {@code PROCESSING}: The order is being processed.
 * - {@code DELIVERED}: The order has been delivered.
 * - {@code POSTPONED}: The order has been postponed.
 * </p>
 * @author AngelStoynov
 */
public enum OrderStatusEnum {
    CANCELLED,
    PROCESSING,
    DELIVERED,
    POSTPONED,
}
