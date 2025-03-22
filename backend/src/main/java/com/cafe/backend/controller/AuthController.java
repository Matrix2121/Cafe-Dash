package com.cafe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserService userService;
    
    @Autowired 
    AuthenticationManager authenticationManager;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));
            String token = jwtUtil.generateToken((UserDetails)authentication.getPrincipal());
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
    
    @PostMapping("/register")
    public String register(@RequestBody RegisterUserDTO registerUserDTO) throws BadRequestException, NotFoundException {
        if(userService.doesUserExist(registerUserDTO.username())) {
        	throw new UserAlreadyExistsException("User with this username already exists");
        }
        // we hash the password here because if there is @Autowired PasswordEncoder
        // in UserService a circular dependecy is detected
        RegisterUserDTO dtoWithHashedPassword = new RegisterUserDTO(
        		registerUserDTO.username(),
        		registerUserDTO.email(),
        		passwordEncoder.encode(registerUserDTO.passwordHash()),
        		registerUserDTO.roleNames());
        
        JWTUserDTO jwtUserDTO = userService.registerUser(dtoWithHashedPassword);
        
        UserDetails userDetails = new CustomUserDetails(jwtUserDTO);
        String token = jwtUtil.generateToken(userDetails);
        return token;
    }
}
