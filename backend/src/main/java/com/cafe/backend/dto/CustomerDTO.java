package com.cafe.backend.dto;

import java.util.List;

/**
 * @author AngelStoynov
 */
public record CustomerDTO(
        double balance,
        String phoneNumber,
        List<OrderDTO> orders
) { }
