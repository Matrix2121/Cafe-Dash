package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

public class RoleMapper {

    private RoleMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static RoleDTO mapToDTO(RoleEntity role) throws DataMappingException {
        if (role == null) {
            throw new DataMappingException("Role cannot be null");
        }

        try {
            return new RoleDTO(
                    role.getId(),
                    role.getRoleName());
        } catch (Exception e) {
            throw new DataMappingException("Cannot not map to roleDTO", e);
        }
    }

    public static RoleEntity mapToEntity(RoleDTO roleDTO) throws DataMappingException {
        try {
            return RoleEntity.builder()
                    .id(roleDTO.id())
                    .roleName(roleDTO.roleName())
                    .build();
        } catch (Exception e) {
            throw new DataMappingException("Cannot not map to role", e);
        }
    }
}
