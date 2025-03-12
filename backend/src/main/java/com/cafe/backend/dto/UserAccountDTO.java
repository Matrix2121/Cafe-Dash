package com.cafe.backend.dto;

import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.role.RoleEntity;

import java.util.Set;

/**
 * @author AngelStoynov
 */
public record UserAccountDTO(
    String username,
    String password,
    Set<RoleEntity> role,
    Set<OrderEntity> orders
) { }
