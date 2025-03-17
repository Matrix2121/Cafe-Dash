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

    public static UserAccountDTO mapToUserAccountDTO(UserEntity account) throws DataMappingException {
        try {

            Set<RoleDTO> roleDTOS = new HashSet<>();
            for (RoleEntity role: account.getRoles()) {
                roleDTOS.add(RoleMapper.toDTO(role));
            }

            Set<OrderDTO> orderDTOS = new HashSet<>();
            for (OrderEntity order: account.getOrders()) {
                orderDTOS.add(OrderMapper.toDTO(order));
            }

            return new UserAccountDTO(
                    account.getId(),
                    account.getUsername(),
                    roleDTOS,
                    orderDTOS
            );
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to dto.", e);
        }
    }
}
