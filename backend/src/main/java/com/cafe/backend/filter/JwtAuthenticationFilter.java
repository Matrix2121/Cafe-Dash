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
 * @author ZapryanZapryanov, AngelStoynov
 */

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

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
                            new UsernamePasswordAuthenticationToken(customUserDetails, customUserDetails.getPassword(), customUserDetails.getAuthorities());
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    request.setAttribute("id", customUserDetails.getId());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        else {
        	response.setContentType("text/plain");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("No token found in the request. You must login first");
            response.getWriter().flush();
		    return;
        }

        filterChain.doFilter(request, response);
    }
    
    // extra measure for skipping this filter
    // i have no idea how it has to be configured through SecurityConfig
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.startsWith("/api/auth") ||
               path.startsWith("/swagger-ui") ||
               path.startsWith("/api/") || //remove this line when security is integrated
               path.startsWith("/v3/api-docs");
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
