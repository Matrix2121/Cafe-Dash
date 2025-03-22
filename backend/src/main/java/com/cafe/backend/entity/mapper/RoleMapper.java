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
            throw new DataMappingException("RoleEntity cannot be null");
        }

        return new RoleDTO(
                role.getId(),
                role.getRoleName()
        );
    }

    public static RoleEntity mapToEntity(RoleDTO roleDTO) throws DataMappingException {
        if (roleDTO == null) {
            throw new DataMappingException("RoleDTO cannot be null");
        }

        return RoleEntity.builder()
                .id(roleDTO.id())
                .roleName(roleDTO.roleName())
                .build();
    }
}
