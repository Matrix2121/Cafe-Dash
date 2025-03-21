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

public class UserMapper {

    public static UserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
        try {
            if (userEntity == null)
                return null;

            Set<RoleDTO> roleDTOS = new HashSet<>();
            if(userEntity.getRoles() != null){
                for (RoleEntity role : userEntity.getRoles()) {
                    roleDTOS.add(RoleMapper.mapToDTO(role));
                }
            }

            Set<OrderDTO> orderDTOS = new HashSet<>();
            if(userEntity.getOrders() != null){
                for (OrderEntity order : userEntity.getOrders()) {
                    orderDTOS.add(OrderMapper.mapToDTO(order));
                }
            }

            Set<ReviewDTO> reviewDTOS = new HashSet<>();
            if(userEntity.getReviews() != null){
                for (ReviewEntity review : userEntity.getReviews()) {
                    reviewDTOS.add(ReviewMapper.mapToDTO(review));
                }
            }

            return new UserDTO(
                    userEntity.getId(),
                    userEntity.getUsername(),
                    roleDTOS,
                    orderDTOS,
                    reviewDTOS);
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to dto.", e);
        }
    }

    public static UserEntity mapToEntity(UserDTO userDTO) throws DataMappingException {
        try {
            if (userDTO == null)
                return null;

            return UserEntity.builder()
                    .id(userDTO.id())
                    .username(userDTO.username())
                    .build();
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to entity.", e);
        }
    }
}
