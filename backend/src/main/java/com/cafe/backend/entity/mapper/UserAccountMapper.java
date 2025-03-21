package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

public class UserAccountMapper {

    private UserAccountMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static UserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {

        if (userEntity == null) {
            throw new DataMappingException("UserEntity cannot be null");
        }

        Set<RoleDTO> roleDTOS = new HashSet<>();
        for (RoleEntity role : userEntity.getRoles()) {
            roleDTOS.add(RoleMapper.mapToDTO(role));
        }

        Set<OrderDTO> orderDTOS = new HashSet<>();
        for (OrderEntity order : userEntity.getOrders()) {
            orderDTOS.add(OrderMapper.mapToDTO(order));
        }

        Set<ReviewDTO> reviewDTOS = new HashSet<>();
        for (ReviewEntity reviewEntity : userEntity.getReviews()) {
            reviewDTOS.add(ReviewMapper.mapToDTO(reviewEntity));
        }

        return new UserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                roleDTOS,
                orderDTOS,
                reviewDTOS
        );
    }

    public static UserEntity mapToEntity(UserDTO userDTO) throws DataMappingException {
        if (userDTO == null) {
            throw new DataMappingException("UserDTO cannot be null");
        }

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
                .email(userDTO.email())
                .roles(roleEntities)
                .orders(orderEntities)
                .build();

    }
}
