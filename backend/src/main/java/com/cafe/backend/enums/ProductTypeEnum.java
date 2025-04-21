package com.cafe.backend.enums;

/**
 * The {@code ProductTypeEnum} defines the available categories for products
 * offered by a cafeteria.
 *
 * <p>This enum is used to classify products for filtering, display,
 * or pricing logic within the application.</p>
 *
 * <ul>
 *   <li>{@link #PROMO} - A promotional item (e.g., discounts, seasonal offers)</li>
 *   <li>{@link #EATING} - A food item such as meals or snacks</li>
 *   <li>{@link #DRINKS} - A beverage (e.g., coffee, soda, water)</li>
 * </ul>
 *
 * <p>Typically used in {@link com.cafe.backend.dto.ProductDTO} and {@code ProductEntity}.</p>
 *
 * @author — AngelStoynov
 */
public enum ProductTypeEnum {
    /** A promotional product. */
    PROMO,

    /** A food product (e.g., meal, snack). */
    EATING,

    /** A drink product (e.g., beverage, coffee). */
    DRINKS
}