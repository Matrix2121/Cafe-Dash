package com.cafe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.service.UserService;

/**
 * The {@code UserController} serves as the RESTful API entry point for managing users.
 * <p>This controller handles HTTP requests from the frontend and interacts with the service layer
 * to perform CRUD operations on users.</p>
 *
 * @author VasilStoykov
 */


@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserDTO createUser(@RequestBody UserDTO userDTO) throws BadRequestException {
        return userService.createUser(userDTO);
    }
    
    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserDTO updateUser(@PathVariable("id") Long id, @RequestBody UserDTO updatedUserDTO)
            throws NotFoundException, BadRequestException {
        return userService.updateUser(id, updatedUserDTO);
    }

    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserDTO getUserById(@PathVariable("id") Long id) throws NotFoundException, BadRequestException {
        return userService.getUserById(id);
    }
}
