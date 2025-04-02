package com.cafe.backend.entity.mapper;

import java.util.*;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

public class UserMapper {

    public static UserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
        if (userEntity == null) {
            throw new DataMappingException("UserEntity cannot be null.");
        }

        List<RoleDTO> roleDTOS = mapRoles(userEntity.getRoles());
        List<OrderDTO> orderDTOS = mapOrders(userEntity.getOrders());
        List<ReviewDTO> reviewDTOS = mapReviews(userEntity.getReviews());

        return new UserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                roleDTOS,
                orderDTOS,
                reviewDTOS
        );
    }

    private static List<RoleDTO> mapRoles(List<RoleEntity> roles) throws DataMappingException {
        if (roles == null || roles.isEmpty()) {
            return new ArrayList<>();
        }
    
        List<RoleDTO> roleDTOs = new ArrayList<>();
        for (RoleEntity role : roles) {
            roleDTOs.add(RoleMapper.mapToDTO(role));
        }
        return roleDTOs;
    }

    private static List<OrderDTO> mapOrders(List<OrderEntity> orders) throws DataMappingException {
        if (orders == null || orders.isEmpty()) {
            return new LinkedList<>();
        }
    
        List<OrderDTO> orderDTOs = new LinkedList<>();
        for (OrderEntity order : orders) {
            orderDTOs.add(OrderMapper.mapToDTO(order));
        }
        return orderDTOs;
    }
    
    private static List<ReviewDTO> mapReviews(List<ReviewEntity> reviews) throws DataMappingException {
        if (reviews == null || reviews.isEmpty()) {
            return new ArrayList<>();
        }
    
        List<ReviewDTO> reviewDTOs = new ArrayList<>();
        for (ReviewEntity review : reviews) {
            reviewDTOs.add(ReviewMapper.mapToDTO(review));
        }
        return reviewDTOs;
    }

    public static UserEntity mapToEntity(UserDTO userDTO) throws DataMappingException {
        if (userDTO == null) {
            throw new DataMappingException("UserDTO cannot be null.");
        }

        List<RoleEntity> roleEntities = new ArrayList<>();
        if(userDTO.roles() != null) {
        	for (RoleDTO role : userDTO.roles()) {
                roleEntities.add(RoleMapper.mapToEntity(role));
            }
        }

        List<OrderEntity> orderEntities = new LinkedList<>();
        if(userDTO.orders() != null) {
        	for (OrderDTO order : userDTO.orders()) {
                orderEntities.add(OrderMapper.mapToEntity(order));
            }
        }

        List<ReviewEntity> reviewEntities = new ArrayList<>();
        if(userDTO.reviews() != null) {
        	for (ReviewDTO review : userDTO.reviews()) {
                reviewEntities.add(ReviewMapper.mapToEntity(review));
            }
        }

        return UserEntity.builder()
                .id(userDTO.id())
                .username(userDTO.username())
                .roles(roleEntities)
                .orders(orderEntities)
                .reviews(reviewEntities)
                .build();
    }
}