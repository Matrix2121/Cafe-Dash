package com.cafe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.LoginRequestDTO;
import com.cafe.backend.dto.RegisterUserDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.UserAlreadyExistsException;
import com.cafe.backend.security.CustomUserDetails;
import com.cafe.backend.security.JwtUtil;
import com.cafe.backend.service.UserService;

/**
 * The {@code AuthController} handles authentication and registration operations.
 * <p>This controller is responsible for login and user creation endpoints. It uses Spring Security's
 * {@link AuthenticationManager} and custom JWT logic to handle secure authentication flows.</p>
 *
 * <p>On successful login or registration, it returns a valid JWT token for the authenticated user.</p>
 *
 * @author ZapryanZapryanov
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    /**
     * Utility class for generating and validating JWT tokens.
     */
    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Service layer responsible for user-related operations such as registration and existence checks.
     */
    @Autowired
    private UserService userService;

    /**
     * Spring Security authentication manager used to authenticate user credentials.
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Password encoder for hashing user passwords before storing them in the database.
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Authenticates a user based on the provided {@link LoginRequestDTO} and returns a JWT token if successful.
     *
     * @param loginRequest The login credentials including username and password.
     * @return A {@link ResponseEntity} containing the JWT token or an error message.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.passwordHash()));
            String token = jwtUtil.generateToken((CustomUserDetails) authentication.getPrincipal());
            return ResponseEntity.ok(token);
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid username or password");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error 400: " + e.getMessage());
        }
    }

    /**
     * Registers a new user with the provided {@link RegisterUserDTO} and returns a JWT token.
     *
     * @param registerUserDTO The registration data including username, email, password, and roles.
     * @return A JWT token for the newly registered user.
     * @throws BadRequestException if the request is invalid.
     * @throws NotFoundException if required resources are missing.
     * @throws UserAlreadyExistsException if a user with the same username already exists.
     */
    @PostMapping("/register")
    public String register(@RequestBody RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException {
        if (userService.doesUserExist(registerUserDTO.username())) {
            throw new UserAlreadyExistsException("User with this username already exists");
        }

        RegisterUserDTO dtoWithHashedPassword = new RegisterUserDTO(
                registerUserDTO.username(),
                registerUserDTO.email(),
                passwordEncoder.encode(registerUserDTO.passwordHash()),
                registerUserDTO.roleNames()
        );

        JWTUserDTO jwtUserDTO = userService.registerUser(dtoWithHashedPassword);
        CustomUserDetails customUserDetails = new CustomUserDetails(jwtUserDTO);
        return jwtUtil.generateToken(customUserDetails);
    }
}
