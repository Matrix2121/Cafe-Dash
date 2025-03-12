package com.cafe.backend.dto;

import com.cafe.backend.enums.OrderStatusEnum;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * @author AngelStoynov
 */
public record OrderDTO(
        Long id,
        double amount,
        int discount,
        LocalDateTime expectedDelivery,
        OrderStatusEnum orderStatus,
        int tip,
        CafeteriaDTO cafeteria,
        Set<ProductDTO> products
) { }
