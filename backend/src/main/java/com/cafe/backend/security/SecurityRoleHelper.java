package com.cafe.backend.security;

import java.util.Arrays;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.cafe.backend.exception.AuthenticationCustomException;

/**
 * The {@code SecurityRoleHelper} class provides a static utility method for checking
 * if the currently authenticated user has any of the specified roles.
 *
 * <p>This helper can be used within controller or service logic to enforce role-based
 * authorization beyond declarative annotations like {@code @PreAuthorize}.</p>
 *
 * <p>If the user is not authenticated or does not possess any of the required roles,
 * an {@link AuthenticationCustomException} is thrown.</p>
 *
 * <p>This class depends on the Spring Security context and should be used in security-aware
 * components such as filters, controllers, or services.</p>
 *
 * @author — ZapryanZapryanov
 */
public class SecurityRoleHelper {

	/**
	 * Checks whether the currently authenticated user has at least one of the specified roles.
	 *
	 * @param wantedRoles A varargs list of accepted role names (e.g. "ADMIN", "CUSTOMER").
	 * @throws AuthenticationCustomException if the user is not authenticated or lacks the required roles.
	 */
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
