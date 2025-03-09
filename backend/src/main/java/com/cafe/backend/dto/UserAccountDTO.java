package com.cafe.backend.dto;

import com.cafe.backend.enums.UserTypeEnum;

/**
 * @author AngelStoynov
 */
public record UserAccountDTO(
    String username,
    String password,
    UserTypeEnum userType
) { }
