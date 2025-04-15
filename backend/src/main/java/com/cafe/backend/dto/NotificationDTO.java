package com.cafe.backend.dto;

import java.util.Map;

public record NotificationDTO (
    String title,
    String body,
    Map<String, Object> data
){}