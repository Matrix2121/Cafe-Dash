package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.PushTokenUpdateRequestDTO;
import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.dto.UpdateUserDTO;
import com.cafe.backend.dto.UserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code UserService} is an interface that defines the methods for managing user-related operations.
 * These operations include user creation, registration, updating user information, retrieving users, and checking if a user exists.
 * <p>
 * The methods in this interface throw {@code BadRequestException} and {@code NotFoundException} when the input is invalid
 * or when the requested user data is not found.
 * </p>
 *
 * @author VasilStoykov
 */
public interface UserService {

	/**
	 * Creates a new user based on the provided registration details.
	 *
	 * @param registerUserDTO the {@code RegisterUserDTO} containing the user registration data.
	 * @return the created {@code UserDTO} with user details.
	 * @throws BadRequestException if the registration data is invalid.
	 * @throws NotFoundException if any associated data (e.g., roles) is not found.
	 */
	UserDTO createUser(RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException;

	/**
	 * Registers a new user and returns a JWT for authentication.
	 *
	 * @param registerUserDTO the {@code RegisterUserDTO} containing the user registration data.
	 * @return the {@code JWTUserDTO} containing user details and the generated JWT.
	 * @throws BadRequestException if the registration data is invalid.
	 * @throws NotFoundException if any associated data (e.g., roles) is not found.
	 */
	JWTUserDTO registerUser(RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException;

	/**
	 * Updates an existing user's details.
	 *
	 * @param id the ID of the user to be updated.
	 * @param userDTO the {@code UpdateUserDTO} containing updated user data.
	 * @return the updated {@code UserDTO}.
	 * @throws BadRequestException if the updated data is invalid.
	 * @throws NotFoundException if the user with the given ID is not found.
	 */
	UserDTO updateUser(Long id, UpdateUserDTO userDTO) throws BadRequestException, NotFoundException;

	/**
	 * Retrieves a user by their unique ID.
	 *
	 * @param id the ID of the user to retrieve.
	 * @return the {@code UserDTO} representing the user with the given ID.
	 * @throws BadRequestException if the ID is invalid.
	 * @throws NotFoundException if no user is found with the given ID.
	 */
	UserDTO getUserById(Long id) throws BadRequestException, NotFoundException;

	/**
	 * Retrieves a user by their email address.
	 *
	 * @param email the email address of the user to retrieve.
	 * @return the {@code UserEntity} representing the user with the given email.
	 * @throws BadRequestException if the email is invalid.
	 * @throws NotFoundException if no user is found with the given email.
	 */
	UserEntity getUserByEmail(String email) throws BadRequestException, NotFoundException;

	/**
	 * Retrieves a list of all users.
	 *
	 * @return a list of {@code UserDTO} representing all users.
	 * @throws BadRequestException if an error occurs while retrieving users.
	 * @throws NotFoundException if no users are found.
	 */
	List<UserDTO> getAllUsers() throws BadRequestException, NotFoundException;

	/**
	 * Checks whether a user with the given username exists.
	 *
	 * @param username the username to check.
	 * @return {@code true} if the user exists, {@code false} otherwise.
	 */
	boolean doesUserExist(String username);

	UserDTO updateExpoPushToken(PushTokenUpdateRequestDTO request) throws BadRequestException, NotFoundException;
}