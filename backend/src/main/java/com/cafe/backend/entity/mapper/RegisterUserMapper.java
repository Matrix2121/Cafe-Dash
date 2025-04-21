package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * {@code RegisterUserMapper} is a utility class used for mapping between {@code RegisterUserDTO} and {@code UserEntity}.
 * This class provides a method to convert a {@code RegisterUserDTO} to a {@code UserEntity}.
 * <p>
 * The class has a private constructor to prevent instantiation as it only contains static utility methods.
 * </p>
 *
 * @author ZapryanZapryanov
 */
public class RegisterUserMapper {

    /**
     * Private constructor to prevent instantiation of this utility class.
     */
    private RegisterUserMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    /**
     * Maps a {@code RegisterUserDTO} to a {@code UserEntity}.
     *
     * @param registerUserDTO the {@code RegisterUserDTO} to map.
     * @return a {@code UserEntity} representing the given DTO.
     * @throws DataMappingException if the input {@code registerUserDTO} is {@code null}, or if an error occurs during mapping.
     */
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
