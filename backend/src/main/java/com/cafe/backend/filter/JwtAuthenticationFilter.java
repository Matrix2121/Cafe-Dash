package com.cafe.backend.filter;

import java.io.IOException;

import com.cafe.backend.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cafe.backend.security.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * The {@code JwtAuthenticationFilter} is a Spring Security filter that handles
 * JWT-based authentication for incoming HTTP requests.
 *
 * <p>It extracts the JWT token from the {@code Authorization} header, validates it,
 * and sets the authentication context if the token is valid.</p>
 *
 * <p>This filter ensures stateless authentication in the application and should be configured
 * to run before {@link UsernamePasswordAuthenticationFilter} in the {@code SecurityFilterChain}.</p>
 *
 * <p>Routes under {@code /api/auth}, {@code /swagger-ui}, and {@code /v3/api-docs} are excluded
 * from filtering via {@link #shouldNotFilter(HttpServletRequest)}.</p>
 *
 * @author ZapryanZapryanov, AngelStoynov
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Filters each incoming request, validating the JWT token and setting the security context.
     *
     * @param request      The current HTTP request.
     * @param response     The current HTTP response.
     * @param filterChain  The filter chain to proceed to the next filter.
     * @throws ServletException if an internal error occurs.
     * @throws IOException      if an I/O error occurs during filtering.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String token = getJWTFromRequest(request);

        if (StringUtils.hasText(token)) {
            Long userId = jwtUtil.getUserIdFromToken(token);
            String username = jwtUtil.getUsernameFromToken(token);

            if (username != null && userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                CustomUserDetails customUserDetails = null;
                try {
                    customUserDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
                } catch (UsernameNotFoundException e) {
                    response.setContentType("text/plain");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("User not found or not authorized");
                    response.getWriter().flush();
                    return;
                }

                if (jwtUtil.validateToken(token, customUserDetails)) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    customUserDetails,
                                    customUserDetails.getPassword(),
                                    customUserDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    request.setAttribute("id", customUserDetails.getId());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } else {
            response.setContentType("text/plain");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("No token found in the request. You must login first");
            response.getWriter().flush();
            return;
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Skips filtering for specific paths (e.g. public endpoints, Swagger docs).
     *
     * @param request The incoming HTTP request.
     * @return {@code true} if the request should not be filtered, {@code false} otherwise.
     * @throws ServletException if an error occurs while checking the path.
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.startsWith("/api/auth") ||
                path.startsWith("/swagger-ui") ||
                path.startsWith("/api/") || // remove this line when security is integrated
                path.startsWith("/v3/api-docs");
    }

    /**
     * Extracts the JWT token from the {@code Authorization} header.
     *
     * @param request The incoming HTTP request.
     * @return The extracted JWT token, or {@code null} if not present or invalid.
     */
    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}