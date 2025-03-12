package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

public class RoleMapper {

    private RoleMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static RoleDTO mapToRoleDTO(RoleEntity role) throws DataMappingException {
        if (role == null) {
            throw new DataMappingException("Role cannot be null");
        }

        try {
            return new RoleDTO(
                    role.getId(),
                    role.getType()
            );
        } catch (Exception e) {
            throw new DataMappingException("Cannot not map to roleDTO", e);
        }
    }

    public static RoleEntity mapToRole(RoleDTO roleDTO) throws DataMappingException {
        try {
            return new RoleEntity(
                    roleDTO.id(),
                    roleDTO.type()
            );
        } catch (Exception e) {
            throw new DataMappingException("Cannot not map to role", e);
        }
    }
}
