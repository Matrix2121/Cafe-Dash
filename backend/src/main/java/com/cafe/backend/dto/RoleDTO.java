package com.cafe.backend.dto;

import com.cafe.backend.enums.UserTypeEnum;

public record RoleDTO(
    Long id,
    UserTypeEnum type
) { }
