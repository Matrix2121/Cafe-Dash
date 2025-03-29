package com.cafe.backend.service;

import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code UserService} is an interface that defines basic CRUD methods.
 * 
 * @author VasilStoykov
 */

public interface UserService {
    UserDTO createUser(RegisterUserDTO registerUserDTO) throws BadRequestException,NotFoundException;
	JWTUserDTO registerUser(RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException;
	UserDTO updateUser(Long id, UserDTO userDTO) throws BadRequestException, NotFoundException;
	UserDTO getUserById(Long id) throws BadRequestException, NotFoundException;
	boolean doesUserExist(String username);
}
