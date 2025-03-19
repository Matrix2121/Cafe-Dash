package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

public class UserMapper {

    private UserMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static UserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
        try {
            if (userEntity == null)
                return null;

            Set<RoleDTO> roleDTOS = new HashSet<>();
            for (RoleEntity role : userEntity.getRoles()) {
                roleDTOS.add(RoleMapper.mapToDTO(role));
            }

            Set<OrderDTO> orderDTOS = new HashSet<>();
            for (OrderEntity order : userEntity.getOrders()) {
                orderDTOS.add(OrderMapper.mapToDTO(order));
            }

            return new UserDTO(
                    userEntity.getId(),
                    userEntity.getUsername(),
                    roleDTOS,
                    orderDTOS);
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to dto.", e);
        }
    }

    public static UserEntity mapToEntity(UserDTO userDTO) throws DataMappingException {
        try {
            if (userDTO == null)
                return null;

            Set<RoleEntity> roleEntities = new HashSet<>();
            for (RoleDTO role : userDTO.role()) {
                roleEntities.add(RoleMapper.mapToEntity(role));
            }

            Set<OrderEntity> orderEntities = new HashSet<>();
            for (OrderDTO order : userDTO.orders()) {
                orderEntities.add(OrderMapper.mapToEntity(order));
            }

            return UserEntity.builder()
                    .id(userDTO.id())
                    .username(userDTO.username())
                    .roles(roleEntities)
                    .orders(orderEntities)
                    .build();
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to entity.", e);
        }
    }
}
