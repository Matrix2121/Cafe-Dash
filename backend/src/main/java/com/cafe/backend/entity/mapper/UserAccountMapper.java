package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.dto.UserAccountDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

public class UserAccountMapper {

    private UserAccountMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static UserAccountDTO ToDTO(UserEntity userEntity) throws DataMappingException {
        try {
            if (userEntity == null) return null;

            Set<RoleDTO> roleDTOS = new HashSet<>();
            for (RoleEntity role : userEntity.getRoles()) {
                roleDTOS.add(RoleMapper.toDTO(role));
            }

            Set<OrderDTO> orderDTOS = new HashSet<>();
            for (OrderEntity order : userEntity.getOrders()) {
                orderDTOS.add(OrderMapper.toDTO(order));
            }

            return new UserAccountDTO(
                    userEntity.getId(),
                    userEntity.getUsername(),
                    userEntity.getEmail(),
                    roleDTOS,
                    orderDTOS);
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to dto.", e);
        }
    }

    public static UserEntity ToEntity(UserAccountDTO userDTO) throws DataMappingException {
        try{
            if (userDTO == null) return null;
            
            Set<RoleEntity> roleEntities = new HashSet<>();
            for(RoleDTO role : userDTO.role()){
                roleEntities.add(RoleMapper.toEntity(role));
            }

            Set<OrderEntity> orderEntities = new HashSet<>();
            for(OrderDTO order : userDTO.orders()){
                orderEntities.add(OrderMapper.toEntity(order));
            }

        return UserEntity.builder()
                .id(userDTO.id())
                .username(userDTO.username())
                .email(userDTO.email())
                .roles(roleEntities)
                .orders(orderEntities)
                .build();
        } catch (Exception e){
            throw new DataMappingException("Cannot map userAccount to entity.", e);
        }
    }
}
