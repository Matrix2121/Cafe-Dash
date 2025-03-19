package com.cafe.backend.service;

import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code UserService} is an interface that defines basic CRUD methods.
 * 
 * @author VasilStoykov
 */

public interface UserService {
    UserDTO createUser(UserDTO userDTO) throws BadRequestException;
    UserDTO updateUser(Long id, UserDTO userDTO) throws BadRequestException, NotFoundException;
    UserDTO getUserById(Long id) throws BadRequestException, NotFoundException;
}
