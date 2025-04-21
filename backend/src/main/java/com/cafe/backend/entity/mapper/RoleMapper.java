package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * The {@code RoleMapper} class provides utility methods for converting between
 * {@link RoleEntity} and {@link RoleDTO}.
 *
 * <p>This mapper ensures a clean separation between entity and DTO representations of user roles,
 * typically used in authentication and user management flows.</p>
 *
 * <p>This class cannot be instantiated.</p>
 *
 * @author ZapryanZapryanov
 */
public class RoleMapper {

    /**
     * Private constructor to prevent instantiation of the utility class.
     *
     * @throws UnsupportedOperationException Always thrown if instantiation is attempted.
     */
    private RoleMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    /**
     * Converts a {@link RoleEntity} into a {@link RoleDTO}.
     *
     * @param role The role entity to convert.
     * @return A {@link RoleDTO} containing the ID and name of the role.
     * @throws DataMappingException if the input entity is {@code null}.
     */
    public static RoleDTO mapToDTO(RoleEntity role) throws DataMappingException {
        if (role == null) {
            throw new DataMappingException("RoleEntity cannot be null");
        }

        return new RoleDTO(
                role.getId(),
                role.getRoleName()
        );
    }

    /**
     * Converts a {@link RoleDTO} into a {@link RoleEntity}.
     *
     * @param roleDTO The DTO to convert.
     * @return A {@link RoleEntity} created from the DTO values.
     * @throws DataMappingException if the input DTO is {@code null}.
     */
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