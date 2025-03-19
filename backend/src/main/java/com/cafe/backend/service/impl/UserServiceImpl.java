package com.cafe.backend.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.mapper.OrderMapper;
import com.cafe.backend.entity.mapper.RegisterUserMapper;
import com.cafe.backend.entity.mapper.RoleMapper;
import com.cafe.backend.entity.mapper.UserMapper;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.role.RoleEntity;

import com.cafe.backend.entity.mapper.OrderMapper;
import com.cafe.backend.entity.mapper.RoleMapper;
import com.cafe.backend.entity.mapper.UserMapper;

import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;

import com.cafe.backend.repository.UserRepository;
import com.cafe.backend.service.UserService;

/**
 * {@code UserServiceImpl} is class that implements {@link UserService}.
 * It uses {@code userRepository} to save/find the necessary data by the
 * provided methods by {@code JpaRepository} which {@link userRepository}
 * extends.
 * 
 * @author VasilStoykov
 */

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) throws BadRequestException {
        UserEntity user = userMapper.mapToEntity(userDTO);
        user.setId(null);
        user.setRoles(null);
        user.setOrders(null);
        user.setReviews(null);
        user.setDeleted(false);
        UserEntity savedUser = userRepository.save(user);
        return userMapper.mapToDTO(savedUser);
    }
    
    @Override
    public UserAccountDTO createUser(RegisterUserDTO registerUserDTO) throws BadRequestException {
        UserEntity user = RegisterUserMapper.toEntity(registerUserDTO);
        user.setId(null);
        user.setOrders(null);
        UserEntity savedUser = userRepository.save(user);
        return UserAccountMapper.ToDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) throws BadRequestException, NotFoundException {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find user with this id:" + id));
        UserEntity updatedUser = updateUserFields(userDTO, user);
        return userMapper.mapToDTO(updatedUser);
    }

    private UserEntity updateUserFields(UserDTO newUserDTO, UserEntity user) throws DataMappingException {
        try {
            Set<RoleEntity> roleEntities = new HashSet<>();
            for (RoleDTO role : newUserDTO.role()) {
                roleEntities.add(RoleMapper.mapToEntity(role));
            }

            Set<OrderEntity> orderEntities = new HashSet<>();
            for (OrderDTO order : newUserDTO.orders()) {
                orderEntities.add(OrderMapper.mapToEntity(order));
            }

            user.setUsername(newUserDTO.username());
            user.setRoles(roleEntities);
            user.setOrders(orderEntities);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to entity.", e);
        }
    }

    @Override
    public UserDTO getUserById(Long id) throws BadRequestException, NotFoundException {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Couldnot find user with this id:" + id));
        return userMapper.mapToDTO(user);
    }

}
