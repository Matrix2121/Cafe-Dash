package com.cafe.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.mapper.JWTUserMapper;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.repository.UserRepository;
import com.cafe.backend.security.CustomUserDetails;

/**
 * {@code CustomUserDetailsServiceImpl} is a service class that implements {@link UserDetailsService}.
 * It provides a custom implementation for loading user details based on the username, specifically for authentication purposes.
 * <p>
 * This service interacts with the {@code UserRepository} to retrieve user information, and it returns a {@code CustomUserDetails}
 * object containing the user details needed for authentication. The username is verified to ensure it corresponds to an existing, non-deleted user.
 * </p>
 *
 * @author ZapryanZapryanov
 */
@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	/**
	 * Loads user details by the provided username.
	 *
	 * @param username the username of the user to load.
	 * @return the {@code UserDetails} containing the user's information for authentication.
	 * @throws UsernameNotFoundException if no user is found with the given username or if the user is deleted.
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userRepository.findByUsernameAndIsDeletedFalse(username)
				.orElseThrow(() -> new UsernameNotFoundException("Incorrect username or password"));
		JWTUserDTO jwtUserDTO = null;
		try {
			jwtUserDTO = JWTUserMapper.mapToDTO(user);
		} catch (DataMappingException e) {
			e.printStackTrace();
		}
		return new CustomUserDetails(jwtUserDTO);
	}
}
