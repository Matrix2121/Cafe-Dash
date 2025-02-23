package com.cafe.backend.dto;

/**
 * @author AngelStoynov
 */
public record EmployeeDTO(
    double salary,
    String location,
    double rating,
    String phoneNumber
) { }
