package com.cafe.backend.security;

import java.util.Arrays;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.cafe.backend.exception.AuthenticationCustomException;

public class SecurityRoleHelper {
	public static void checkUserHasAnyRole(String... wantedRoles) throws AuthenticationCustomException {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    if (authentication == null) {
	        throw new AuthenticationCustomException("User is not authenticated.");
	    }
	    
	    boolean hasRole = Arrays.stream(wantedRoles)
	        .anyMatch(role -> authentication.getAuthorities().stream()
	            .anyMatch(a -> a.getAuthority().equals(role)));
	    
	    if (!hasRole) {
	        throw new AuthenticationCustomException("User does not have any of the required roles: " + Arrays.toString(wantedRoles));
	    }
	}
}
