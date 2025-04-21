package com.cafe.backend.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * The {@code JwtUtil} component handles all JWT-related operations such as token generation,
 * validation, parsing claims, and extracting user information.
 *
 * <p>This class is central to managing stateless authentication using JWT in the application.
 * It signs tokens using a predefined secret key and encodes claims such as user ID, roles,
 * and username.</p>
 *
 * <p>Tokens are set to expire after a fixed duration to improve security. Expired tokens are
 * rejected during validation.</p>
 *
 * @author ZapryanZapryanov, AngelStoynov
 */

@Component
public class JwtUtil {

    /**
     * Secret key used to sign and verify JWT tokens.
     */
    private static final String SECRET = "MYSPERsecretKeycafeeeDash4232432232vcxvdsdcxdagsdfxcvdfesdcafwedsaxdfvki3o23i946845utoefjdsghtp59uw93ridejrie58943u024woiksdfbgftueri4";

    /**
     * JWT token expiration time in milliseconds (24 hours).
     */
    private static final Long JWT_EXPARATION = 86400000L;

    /**
     * Generates a JWT token containing user details and custom claims.
     *
     * @param customUserDetails The authenticated user's details.
     * @return A signed JWT token string.
     */
    public String generateToken(CustomUserDetails customUserDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", customUserDetails.getId());
        claims.put("roles", customUserDetails.getAuthorities());
        claims.put("username", customUserDetails.getUsername());
        return createToken(claims, customUserDetails.getUsername());
    }

    /**
     * Extracts the username (subject) from a JWT token.
     *
     * @param token The JWT token.
     * @return The username embedded in the token.
     */
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token, Claims::getSubject);
    }

    /**
     * Extracts the user ID from a JWT token.
     *
     * @param token The JWT token.
     * @return The user ID embedded in the token.
     */
    public Long getUserIdFromToken(String token) {
        return getClaimsFromToken(token, claims -> claims.get("id", Long.class));
    }

    /**
     * Extracts claims from a JWT token using a provided resolver function.
     *
     * @param token           The JWT token.
     * @param claimsResolver  A function to resolve the desired claim from the token.
     * @param <T>             The expected return type.
     * @return The resolved claim value.
     */
    public <T> T getClaimsFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    /**
     * Validates the token against the user’s details.
     *
     * @param token       The JWT token to validate.
     * @param userDetails The user details to compare against.
     * @return {@code true} if the token is valid, not expired, and matches the user.
     */
    public boolean validateToken(String token, CustomUserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        final Long tokenId = getUserIdFromToken(token);

        return username.equals(userDetails.getUsername())
                && tokenId.equals(userDetails.getId())
                && !isTokenExpired(token)
                && userDetails.isEnabled()
                && userDetails.isAccountNonLocked();
    }

    /**
     * Checks if the token has expired.
     *
     * @param token The JWT token.
     * @return {@code true} if the token is expired or invalid.
     */
    private boolean isTokenExpired(String token) {
        try {
            final Date expiration = getClaimsFromToken(token, Claims::getExpiration);
            return expiration.before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    /**
     * Creates a signed JWT token using provided claims and subject.
     *
     * @param claims  The custom claims to embed.
     * @param subject The subject (typically the username).
     * @return A signed JWT token string.
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPARATION);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
}
