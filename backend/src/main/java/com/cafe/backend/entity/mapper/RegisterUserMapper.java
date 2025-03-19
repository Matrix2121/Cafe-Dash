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

    public static UserEntity toEntity(RegisterUserDTO registerUserDTO) throws DataMappingException {
        try {
            if (registerUserDTO == null) return null;

            Set<RoleEntity> roleEntities = new HashSet<>();
            if(registerUserDTO.roles() != null) {
            	for (RoleDTO role : registerUserDTO.roles()) {
                    roleEntities.add(RoleMapper.mapToEntity(role));
                }
            }

            return UserEntity.builder()
                    .id(registerUserDTO.id())
                    .username(registerUserDTO.username())
                    .email(registerUserDTO.email())
                    .password(registerUserDTO.passwordHash())
                    .roles(roleEntities)
                    .build();
        } catch (Exception e) {
            throw new DataMappingException("Cannot map register user to entity.", e);
        }
    }
}
