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

import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ReviewMapper reviewMapper;

    public UserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
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
                    reviewDTOS.add(reviewMapper.mapToDTO(review));
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

    public UserEntity mapToEntity(UserDTO userDTO) throws DataMappingException {
        try {
            if (userDTO == null)
                return null;
            
            Set<RoleEntity> roleEntities = new HashSet<>();
            if(userDTO.role() != null){
                for (RoleDTO role : userDTO.role()) {
                    roleEntities.add(RoleMapper.mapToEntity(role));
                }
            }
            

            Set<OrderEntity> orderEntities = new HashSet<>();
            if(userDTO.orders() != null){
                for (OrderDTO order : userDTO.orders()) {
                    orderEntities.add(OrderMapper.mapToEntity(order));
                }
            }

            Set<ReviewEntity> reviewEntities = new HashSet<>();
            if(userDTO.reviews() != null){
                for (ReviewDTO review : userDTO.reviews()) {
                    reviewEntities.add(reviewMapper.mapToEntity(review));
                }
            }

            return UserEntity.builder()
                    .id(userDTO.id())
                    .username(userDTO.username())
                    .roles(roleEntities)
                    .orders(orderEntities)
                    .reviews(reviewEntities)
                    .build();
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to entity.", e);
        }
    }
}
