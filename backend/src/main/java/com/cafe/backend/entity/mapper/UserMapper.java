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

/**
 * {@code UserMapper} is a utility class used for mapping between {@code UserEntity} and {@code UserDTO}.
 * This class provides methods to convert a {@code UserEntity} to a {@code UserDTO} and vice versa.
 * <p>
 * The methods also handle mapping of related entities like roles, orders, and reviews.
 * </p>
 *
 * @author VasilStoykov
 */
public class UserMapper {

    /**
     * Maps a {@code UserEntity} to a {@code UserDTO}.
     *
     * @param userEntity the {@code UserEntity} to map.
     * @return a {@code UserDTO} representing the given entity.
     * @throws DataMappingException if the input {@code userEntity} is {@code null}.
     */
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

    /**
     * Maps a list of {@code RoleEntity} to a list of {@code RoleDTO}.
     *
     * @param roles the list of {@code RoleEntity} to map.
     * @return a list of {@code RoleDTO} representing the given roles.
     * @throws DataMappingException if an error occurs during mapping.
     */
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

    /**
     * Maps a list of {@code OrderEntity} to a list of {@code OrderDTO}.
     *
     * @param orders the list of {@code OrderEntity} to map.
     * @return a list of {@code OrderDTO} representing the given orders.
     * @throws DataMappingException if an error occurs during mapping.
     */
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

    /**
     * Maps a list of {@code ReviewEntity} to a list of {@code ReviewDTO}.
     *
     * @param reviews the list of {@code ReviewEntity} to map.
     * @return a list of {@code ReviewDTO} representing the given reviews.
     * @throws DataMappingException if an error occurs during mapping.
     */
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

    /**
     * Maps a {@code UserDTO} to a {@code UserEntity}.
     *
     * @param userDTO the {@code UserDTO} to map.
     * @return a {@code UserEntity} representing the given DTO.
     * @throws DataMappingException if the input {@code userDTO} is {@code null}.
     */
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