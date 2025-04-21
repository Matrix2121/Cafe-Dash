package com.cafe.backend.dto;

/**
 * Data transfer object (DTO) representing a role.
 * This record holds the details of a role, including:
 * - The unique identifier of the role {@code id}.
 * - The name of the role {@code roleName}.
 *
 * @author ZapryanZapryanov
 */
public record RoleDTO(
        Long id,
        String roleName
) { }