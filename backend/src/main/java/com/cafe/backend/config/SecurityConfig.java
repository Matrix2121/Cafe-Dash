package com.cafe.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cafe.backend.filter.JwtAuthenticationFilter;

/**
 * The {@code SecurityConfig} class configures Spring Security for the application.
 *
 * <p>This configuration sets up password encoding, JWT-based authentication, stateless session management,
 * and request-level authorization rules. Certain public endpoints such as authentication and Swagger
 * documentation are excluded from authentication.</p>
 *
 * <p>JWT tokens are handled through a custom {@link JwtAuthenticationFilter}, which is added before
 * the standard {@link UsernamePasswordAuthenticationFilter} in the filter chain.</p>
 *
 * @author ZapryanZapryanov
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Custom JWT authentication filter that processes incoming requests and validates JWT tokens.
     */
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Provides a {@link PasswordEncoder} bean using BCrypt hashing.
     *
     * @return A password encoder that securely hashes passwords using BCrypt.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Provides the {@link AuthenticationManager} used for authenticating login credentials.
     *
     * @param authConfig The Spring Security authentication configuration.
     * @return The configured authentication manager.
     * @throws Exception if the authentication manager cannot be created.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Configures the application's HTTP security, including:
     * <ul>
     *   <li>Disabling CSRF protection</li>
     *   <li>Setting session management to stateless</li>
     *   <li>Allowing unauthenticated access to auth and Swagger endpoints</li>
     *   <li>Requiring authentication for all other requests</li>
     * </ul>
     *
     * @param http The {@link HttpSecurity} object to configure.
     * @return The constructed {@link SecurityFilterChain}.
     * @throws Exception if there is an error during configuration.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/**", // will be removed
                                "/api/auth/**",
                                "/v2/api-docs/**",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/swagger-ui/**",
                                "/webjars/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic().disable();

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
