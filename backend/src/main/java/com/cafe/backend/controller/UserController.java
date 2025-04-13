package com.cafe.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.dto.UpdateUserDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.UserAlreadyExistsException;
import com.cafe.backend.service.UserService;

/**
 * The {@code UserController} serves as the RESTful API entry point for managing users.
 * <p>This controller handles HTTP requests from the frontend and interacts with the service layer
 * to perform CRUD operations on users.</p>
 *
 * @author VasilStoykov, ZapryanZapryanov
 */


@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserDTO createUser(@RequestBody RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException {
    	if(userService.doesUserExist(registerUserDTO.username())) {
        	throw new UserAlreadyExistsException("User with this username already exists");
        }
    	RegisterUserDTO dtoWithHashedPassword = new RegisterUserDTO(
        		registerUserDTO.username(),
        		registerUserDTO.email(),
        		passwordEncoder.encode(registerUserDTO.passwordHash()),
        		registerUserDTO.roleNames());
    	return userService.createUser(dtoWithHashedPassword);
    }
    
    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserDTO updateUser(@PathVariable("id") Long id, @RequestBody UpdateUserDTO updatedUserDTO)
            throws NotFoundException, BadRequestException {
        return userService.updateUser(id, updatedUserDTO);
    }

    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserDTO getUserById(@PathVariable("id") Long id) throws NotFoundException, BadRequestException {
        return userService.getUserById(id);
    }
    
    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<UserDTO> getAllUsers() throws NotFoundException, BadRequestException {
    	// temporarily disabled, works, filter has to be enabled
    	// SecurityRoleHelper.checkUserHasAnyRole("admin");
        return userService.getAllUsers();
    }
}
