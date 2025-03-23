package com.cafe.backend.security;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cafe.backend.dto.JWTUserDTO;

public class CustomUserDetails implements UserDetails {
	private static final long serialVersionUID = 1L;
    private final String username;
    private final String password;
    private final Set<GrantedAuthority> authorities;

    public CustomUserDetails(JWTUserDTO jwtUserDTO) {
    	this.password = jwtUserDTO.password();
        this.username = jwtUserDTO.username();
        this.authorities = jwtUserDTO.roles().stream()
                .map(role -> (GrantedAuthority) () -> role.roleName().toUpperCase())
                .collect(Collectors.toSet());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
