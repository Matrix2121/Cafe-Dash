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
import com.cafe.backend.security.SecurityRoleHelper;
import com.cafe.backend.service.UserService;

/**
 * The {@code UserController} serves as the RESTful API entry point for managing users.
 *
 * <p>This controller handles HTTP requests from the frontend and interacts with the service layer
 * to perform CRUD operations on users. It supports user creation, retrieval, and updates.</p>
 *
 * <p>Passwords are hashed before being stored, and duplicate usernames are prevented at the API level.</p>
 *
 * @author VasilStoykov, ZapryanZapryanov
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    /**
     * Service responsible for executing business logic related to users.
     */
    @Autowired
    private UserService userService;

    /**
     * Encoder used for hashing user passwords before storing them in the database.
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Creates a new user after verifying uniqueness and encoding the password.
     *
     * @param registerUserDTO A {@link RegisterUserDTO} containing the new user's credentials and roles.
     * @return A {@link UserDTO} representing the newly created user.
     * @throws BadRequestException if the provided data is invalid.
     * @throws NotFoundException if required related entities are missing.
     * @throws UserAlreadyExistsException if a user with the same username already exists.
     */
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserDTO createUser(@RequestBody RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException {
    	SecurityRoleHelper.checkUserHasAnyRole("admin", "owner");
        if (userService.doesUserExist(registerUserDTO.username())) {
            throw new UserAlreadyExistsException("User with this username already exists");
        }

        RegisterUserDTO dtoWithHashedPassword = new RegisterUserDTO(
                registerUserDTO.username(),
                registerUserDTO.email(),
                passwordEncoder.encode(registerUserDTO.passwordHash()),
                registerUserDTO.roleNames()
        );

        return userService.createUser(dtoWithHashedPassword);
    }

    /**
     * Updates an existing user's information by their ID.
     *
     * @param id The ID of the user to update.
     * @param updatedUserDTO A {@link UpdateUserDTO} containing the updated user information.
     * @return The updated {@link UserDTO}.
     * @throws NotFoundException if the user does not exist.
     * @throws BadRequestException if the input data is invalid.
     */
    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserDTO updateUser(@PathVariable("id") Long id, @RequestBody UpdateUserDTO updatedUserDTO)
            throws NotFoundException, BadRequestException {
    	SecurityRoleHelper.checkUserHasAnyRole("admin", "owner");
        return userService.updateUser(id, updatedUserDTO);
    }

    /**
     * Retrieves a single user by their unique ID.
     *
     * @param id The ID of the user to retrieve.
     * @return A {@link UserDTO} representing the user.
     * @throws NotFoundException if the user does not exist.
     * @throws BadRequestException if the provided ID is invalid.
     */
    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserDTO getUserById(@PathVariable("id") Long id) throws NotFoundException, BadRequestException {
        return userService.getUserById(id);
    }

    /**
     * Retrieves a list of all users in the system.
     *
     * @return A list of {@link UserDTO} objects representing all users.
     * @throws NotFoundException if no users are found.
     * @throws BadRequestException if a request issue occurs.
     */
    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<UserDTO> getAllUsers() throws NotFoundException, BadRequestException {
    	SecurityRoleHelper.checkUserHasAnyRole("admin", "owner");
        return userService.getAllUsers();
    }
}
