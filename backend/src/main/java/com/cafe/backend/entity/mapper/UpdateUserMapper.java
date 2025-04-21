package com.cafe.backend.entity.mapper;

import java.util.ArrayList;
import java.util.List;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.UpdateUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * The {@code UpdateUserMapper} is a utility class responsible for converting a {@link UserEntity}
 * into an {@link UpdateUserDTO}.
 *
 * <p>This mapper is typically used when editing or displaying user data in administrative
 * or profile update interfaces, ensuring only updatable fields are included in the DTO.</p>
 *
 * <p>The mapped DTO contains the user's basic account information and a list of role names.</p>
 *
 * <p>This class only supports mapping in one direction (Entity → DTO).</p>
 *
 * @author — ZapryanZapryanov
 */
public class UpdateUserMapper {

    /**
     * Converts a {@link UserEntity} into an {@link UpdateUserDTO}, including mapped role names.
     *
     * @param userEntity The user entity to convert.
     * @return An {@link UpdateUserDTO} containing the user's ID, username, email, and role names.
     * @throws DataMappingException if the provided {@code userEntity} is {@code null}.
     */
    public static UpdateUserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
        List<String> roles = new ArrayList<>();
        if (userEntity.getRoles() != null) {
            for (RoleEntity role : userEntity.getRoles()) {
                roles.add(role.getRoleName());
            }
        }

        return new UpdateUserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                roles
        );
    }
}