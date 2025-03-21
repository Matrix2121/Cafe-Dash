package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

public class RegisterUserMapper {

    private RegisterUserMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static UserEntity mapToEntity(RegisterUserDTO registerUserDTO) throws DataMappingException {
        if (registerUserDTO == null) {
            throw new DataMappingException("RegisterUserDTO cannot be null.");
        }

        Set<RoleEntity> roleEntities = new HashSet<>();
        for (RoleDTO role : registerUserDTO.roles()) {
            roleEntities.add(RoleMapper.mapToEntity(role));
        }

        return UserEntity.builder()
                .id(registerUserDTO.id())
                .username(registerUserDTO.username())
                .email(registerUserDTO.email())
                .password(registerUserDTO.passwordHash())
                .roles(roleEntities)
                .build();
    }
}
