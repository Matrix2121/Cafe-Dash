package com.cafe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cafe.backend.dto.UserAccountDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserAccountDTO createUser(@RequestBody UserAccountDTO userDTO) throws BadRequestException {
        return userService.createUser(userDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserAccountDTO updateUser(@PathVariable("id") Long id, @RequestBody UserAccountDTO updatedUserDTO)
            throws NotFoundException, BadRequestException {
        return userService.updateUser(id, updatedUserDTO);
    }

    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserAccountDTO getUserById(@PathVariable("id") Long id) throws NotFoundException, BadRequestException {
        return userService.getUserById(id);
    }
}
