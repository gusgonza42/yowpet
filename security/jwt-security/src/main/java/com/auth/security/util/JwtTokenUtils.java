package com.auth.security.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Date;

import org.springframework.security.core.userdetails.User;

/**
 * Servicio para la gestión de tokens JWT.
 */
@Service
public class JwtTokenUtils {
    @Value( "${jwt.secret}" )
    private String secretKey;

    @Value( "${jwt.expiration}" )
    private long jwtExpirationInMs;

    @Value( "${jwt.refreshThreshold}" )
    private long refreshThresholdInMs;

    /**
     * Genera un token JWT para un usuario dado.
     *
     * @return el token JWT generado
     */
    public String generateToken( String username ) {
        return JWT.create( )
                .withSubject( username )
                .withIssuedAt( new Date( ) )
                .withExpiresAt( new Date( System.currentTimeMillis( ) + jwtExpirationInMs ) )
                .sign( Algorithm.HMAC256( secretKey ) );
    }

    /**
     * Verifica si un token JWT es válido.
     *
     * @param token el token JWT a verificar
     * @return true si el token es válido, false en caso contrario
     */
    public boolean isValidToken( String token ) {
        try {
            JWTVerifier verifier = JWT.require( Algorithm.HMAC256( secretKey ) )
                    .build( );
            DecodedJWT jwt = verifier.verify( token );
            return jwt.getExpiresAt( ).after( new Date( ) );
        } catch ( JWTVerificationException e ) {
            return false;
        }
    }

    /**
     * Verifica si un token JWT ha expirado.
     *
     * @param token el token JWT a verificar
     * @return true si el token ha expirado, false en caso contrario
     */
    public boolean isTokenExpired( String token ) {
        return extractExpiration( token ).before( new Date( ) );
    }

    /**
     * Verifica si un token JWT está cerca de expirar.
     *
     * @param token el token JWT a verificar
     * @return true si el token está cerca de expirar, false en caso contrario
     */
    public boolean isTokenNearExpiry( String token ) {
        return extractExpiration( token ).before( new Date( System.currentTimeMillis( ) + refreshThresholdInMs ) );
    }

    /**
     * Refresca un token JWT para un usuario dado.
     *
     * @param username el nombre de usuario para el cual se refrescará el token
     * @return el nuevo token JWT generado
     */
    public String refreshToken( String username ) {
        return generateToken( username );
    }

    /**
     * Obtiene la autenticación de un token JWT.
     *
     * @param token el token JWT del cual se extraerá la autenticación
     * @return un objeto UsernamePasswordAuthenticationToken con la autenticación del usuario
     */
    public UsernamePasswordAuthenticationToken getAuthentication( String token ) {
        String username = extractUsername( token );
        User userDetails = new User( username , "" , java.util.Collections.emptyList( ) );
        return new UsernamePasswordAuthenticationToken( userDetails , null , userDetails.getAuthorities( ) );
    }

    /**
     * Extrae el nombre de usuario de un token JWT.
     *
     * @param token el token JWT del cual se extraerá el nombre de usuario
     * @return el nombre de usuario extraído del token
     */
    public String extractUsername( String token ) {
        return JWT.require( Algorithm.HMAC256( secretKey ) )
                .build( )
                .verify( token )
                .getSubject( );
    }

    /**
     * Extrae la fecha de expiración de un token JWT.
     *
     * @param token el token JWT del cual se extraerá la fecha de expiración
     * @return la fecha de expiración del token
     */
    private Date extractExpiration( String token ) {
        return JWT.require( Algorithm.HMAC256( secretKey ) )
                .build( )
                .verify( token )
                .getExpiresAt( );
    }
}