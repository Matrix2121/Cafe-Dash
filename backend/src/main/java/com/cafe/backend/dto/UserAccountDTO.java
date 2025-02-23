package com.cafe.backend.dto;

import com.cafe.backend.enums.UserType;

/**
 * @author AngelStoynov
 */
public record UserAccountDTO(
    String username,
    String password,
    UserType userType
) { }
