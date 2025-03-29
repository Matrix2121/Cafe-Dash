package com.cafe.backend.dto;

import com.cafe.backend.enums.OrderStatusEnum;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author ZapryanZapryanov
 */
public record OrderDTO(
        Long id,
        int discount, // 0.0 for creation
        LocalDateTime readyPickupTime, // required for creation
        OrderStatusEnum status, // PROCESSING for creation
        double tip, // 0.0 for creation
        Long cafeteriaId,
        Long userId,
        double totalPrice,
        List<OrderProductDTO> orderProducts
) {}
