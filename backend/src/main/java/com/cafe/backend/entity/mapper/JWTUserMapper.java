package com.cafe.backend.entity.mapper;

import java.util.ArrayList;
import java.util.List;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * The {@code JWTUserMapper} is a utility class responsible for converting a {@link UserEntity}
 * into a {@link JWTUserDTO}.
 *
 * <p>This mapping is typically used during authentication flows, where user information is needed
 * for JWT token generation or validation.</p>
 *
 * <p>The mapper extracts the user's ID, username, password, and roles into a lightweight structure
 * suitable for JWT payloads.</p>
 *
 * @author ZapryanZapryanov
 */
public class JWTUserMapper {

    /**
     * Converts a {@link UserEntity} into a {@link JWTUserDTO}.
     *
     * @param userEntity The user entity to be mapped.
     * @return A {@link JWTUserDTO} containing the user's ID, username, password, and roles.
     * @throws DataMappingException if any mapping-related issue occurs (reserved for future validation or custom errors).
     */
    public static JWTUserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
        List<String> rolesSet = new ArrayList<>();
        if (userEntity.getRoles() != null) {
            for (RoleEntity role : userEntity.getRoles()) {
                rolesSet.add(role.getRoleName());
            }
        }

        return new JWTUserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                rolesSet
        );
    }
}