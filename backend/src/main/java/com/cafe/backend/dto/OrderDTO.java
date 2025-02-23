package com.cafe.backend.dto;

import com.cafe.backend.enums.OrderStatus;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * @author AngelStoynov
 */
public record OrderDTO(
        Double amount,
        int discount,
        LocalDateTime expectedDelivery,
        OrderStatus orderStatus,
        int tip,
        EmployeeDTO employee,
        CafeteriaDTO cafeteria,
        Set<ProductDTO> products
) { }
