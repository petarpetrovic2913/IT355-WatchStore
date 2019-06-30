package com.pilot.watchstore.config;

import com.pilot.watchstore.model.Customer;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import static com.pilot.watchstore.config.SecurityConstants.*;

@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication , boolean rememberMe){
        Customer customer = (Customer) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate;

        if(rememberMe) {
             expiryDate = new Date(now.getTime() + REMEMBER_ME_EXP_TIME);
        }else{
             expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        }

        //Token is a string!

        String customerId = Long.toString(customer.getCustomerId());
        Map<String, Object> claims = new HashMap<>();
        claims.put("id",(Long.toString(customer.getCustomerId())));
        claims.put("username",customer.getUsername());
        claims.put("customerName", customer.getCustomerName());
        claims.put("role",customer.getAuthorities());

        return Jwts.builder()
                .setSubject(customerId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512 , SECRET)
                .compact();
    }

    //Validate the token

    public boolean validateToken(String token){

        try{

            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;

        }catch(SignatureException ex){
            System.out.println("Invalid JWT Signature");
        }catch(MalformedJwtException ex){
            System.out.println("Invalid JWT Token");
        }catch(ExpiredJwtException ex){
            System.out.println("Expired JWT token");
        }catch(UnsupportedJwtException ex){
            System.out.println("Unsupported JWT token");
        }catch(IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
        }

        return false;
    }

    //Get customer id from token

    public Long getCustomerIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");

        return Long.parseLong(id);
    }


}
