package org.backendmealplan.backendmealplan.security;

import java.io.IOException;
import java.util.Date;
import java.util.LinkedHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.security.service.UserDetailsImpl;
import org.backendmealplan.backendmealplan.security.service.UserDetailsServiceImpl;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    private String jwtSecret = "helloHackerrr";

    private int expirationAfterOneHour = 7200000;

    @Autowired
    UsersDAO userDAO;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        User u = userDAO.findByEmail(userPrincipal.getUsername());
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + expirationAfterOneHour))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .claim("user",u)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public User getUserFromJwtToken(String jwtToken) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(jwtToken)
                .getBody();

        //User user = claims.get("user", User.class);
        User user = null;
        Object userClaim = claims.get("user");
        if (userClaim instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> userMap = (LinkedHashMap<String, Object>) userClaim;
            ObjectMapper mapper = new ObjectMapper();
            user = mapper.convertValue(userMap, User.class);
        }

        return user;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

}
