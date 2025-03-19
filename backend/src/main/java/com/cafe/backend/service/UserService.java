package com.cafe.backend.service;

import com.cafe.backend.dto.UserAccountDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code UserService} is an interface that defines basic CRUD methods.
 * 
 * @author VasilStoykov
 */

public interface UserService {
    UserAccountDTO createUser(UserAccountDTO userDTO) throws BadRequestException;
    UserAccountDTO updateUser(Long id, UserAccountDTO userDTO) throws BadRequestException, NotFoundException;
    UserAccountDTO getUserById(Long id) throws BadRequestException, NotFoundException;
}
