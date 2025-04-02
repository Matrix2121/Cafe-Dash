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

        // Create defensive copies of collections before iteration
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

    private static List<RoleDTO> mapRoles(List<RoleEntity> roles) {
        if (roles == null || roles.isEmpty()) {
            return new ArrayList<>();
        }
        // Create a new ArrayList from the collection
        return new ArrayList<>(roles).stream()
                .map(t -> {
                    try {
                        return RoleMapper.mapToDTO(t);
                    } catch (DataMappingException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                    return null;
                })
                .toList();
    }

    private static List<OrderDTO> mapOrders(List<OrderEntity> orders) {
        if (orders == null || orders.isEmpty()) {
            return new LinkedList<>();
        }
        // Create a new LinkedList from the collection
        return new LinkedList<>(orders).stream()
                .map(t -> {
                    try {
                        return OrderMapper.mapToDTO(t);
                    } catch (DataMappingException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                    return null;
                })
                .toList();
    }

    private static List<ReviewDTO> mapReviews(List<ReviewEntity> reviews) {
        if (reviews == null || reviews.isEmpty()) {
            return new ArrayList<>();
        }
        // Create a new ArrayList from the collection
        return new ArrayList<>(reviews).stream()
                .map(t -> {
                    try {
                        return ReviewMapper.mapToDTO(t);
                    } catch (DataMappingException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                    return null;
                })
                .toList();
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