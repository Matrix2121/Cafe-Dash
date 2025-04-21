package com.cafe.backend.security;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import com.cafe.backend.filter.JwtAuthenticationFilter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cafe.backend.dto.JWTUserDTO;

/**
 * The {@code CustomUserDetails} class is a custom implementation of Spring Security's
 * {@link UserDetails} interface.
 *
 * <p>It wraps user information from a {@link JWTUserDTO} and is used during authentication
 * and authorization processes in the security context.</p>
 *
 * <p>Authorities are derived from the user's roles and converted to {@link GrantedAuthority} instances.</p>
 *
 * <p>This class is typically injected into Spring Security’s context after a successful login
 * or token validation.</p>
 *
 * @see JWTUserDTO
 * @see JwtAuthenticationFilter
 * @see UserDetails
 */
public class CustomUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;

    /** The unique identifier of the user. */
    private final Long id;

    /** The username used for authentication. */
    private final String username;

    /** The encrypted password of the user. */
    private final String password;

    /** The set of roles/authorities granted to the user. */
    private final Set<GrantedAuthority> authorities;

    /**
     * Constructs a {@code CustomUserDetails} instance using data from a {@link JWTUserDTO}.
     *
     * @param jwtUserDTO The user data used to build this object.
     */
    public CustomUserDetails(JWTUserDTO jwtUserDTO) {
        this.id = jwtUserDTO.id();
        this.password = jwtUserDTO.password();
        this.username = jwtUserDTO.username();
        this.authorities = jwtUserDTO.roles().stream()
                .map(role -> (GrantedAuthority) () -> role)
                .collect(Collectors.toSet());
    }

    /**
     * Returns the authorities granted to the user.
     *
     * @return A collection of granted authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    /**
     * Returns the user's hashed password.
     *
     * @return The password.
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return The username.
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Returns the user's unique ID.
     *
     * @return The user ID.
     */
    public Long getId() {
        return id;
    }

    /**
     * Indicates whether the user's account has expired.
     *
     * @return Always {@code true} – account never expires.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is locked.
     *
     * @return Always {@code true} – account is never locked.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) have expired.
     *
     * @return Always {@code true} – credentials never expire.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled or disabled.
     *
     * @return Always {@code true} – user is always enabled.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
