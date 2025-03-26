package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * @author ZapryanZapryanov
 */

public class RegisterUserMapper {

    private RegisterUserMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static UserEntity mapToEntity(RegisterUserDTO registerUserDTO) throws DataMappingException {
    	if(registerUserDTO == null) throw new DataMappingException("Dto cannot be null");
        try {
            return UserEntity.builder()
                    .username(registerUserDTO.username())
                    .email(registerUserDTO.email())
                    .password(registerUserDTO.passwordHash())
                    .build();
            
        } catch (Exception e) {
            throw new DataMappingException("Cannot map register user to entity.", e);
        }
    }
}
