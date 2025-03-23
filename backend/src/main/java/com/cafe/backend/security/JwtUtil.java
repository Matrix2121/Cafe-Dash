package com.cafe.backend.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final String SECRET = "MYSPERsecretKeycafeeeDash4232432232vcxvdsdcxdagsdfxcvdfesdcafwedsaxdfvki3o23i946845utoefjdsghtp59uw93ridejrie58943u024woiksdfbgftueri4";

    private static final Long JWT_EXPARATION = 86400000L;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());
        claims.put("username", userDetails.getUsername());
        return createToken(claims, userDetails.getUsername());
    }	

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

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token, Claims::getSubject);
    }

    public <T> T getClaimsFromToken(String token, Function<Claims, T> claimsResolver) {
    	// could also add more error handling but for now its ok
        final Claims claims = Jwts.parser()
                                  .setSigningKey(SECRET)
                                  .parseClaimsJws(token)
                                  .getBody();
        return claimsResolver.apply(claims);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
    	try {
    		final Date expiration = getClaimsFromToken(token, Claims::getExpiration);
            return expiration.before(new Date());
    	}
        catch (ExpiredJwtException e) {
			return true;
		}
    }
}