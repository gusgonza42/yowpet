package com.auth.security.service;

import com.auth.security.dto.AuthRequest;
import com.auth.security.dto.AuthResponse;
import com.auth.security.model.Message;
import com.auth.security.model.User;
import com.auth.security.repository.UserRepository;
import com.auth.security.util.AuthConstants;
import com.auth.security.util.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import static com.auth.security.util.Utils.printMssg;

/**
 * Servicio para la gestión de Authentication.
 */
@Service
public class AuthService {
    private final JwtTokenUtils jwtTokenUtils;
    private final UserRepository userRepository;

    /**
     * Constructor de AuthService.
     *
     * @param jwtTokenUtils  Utilidad para la gestión de tokens JWT.
     * @param userRepository Repositorio de usuarios.
     */
    @Autowired
    public AuthService( JwtTokenUtils jwtTokenUtils , UserRepository userRepository ) {
        this.jwtTokenUtils = jwtTokenUtils;
        this.userRepository = userRepository;
    }

    /**
     * Endpoint para obtener un el estado del proyecto.
     *
     * @return ResponseEntity con el mensaje del estado del proyecto.
     */
    public ResponseEntity< String > getHello( ) {
        printMssg( AuthConstants.HELLO_FROM_AUTH_PROJECT );
        return ResponseEntity.status( HttpStatus.OK ).body( AuthConstants.HELLO_FROM_AUTH_PROJECT );
    }

    /**
     * Endpoint para iniciar sesión.
     *
     * @param authRequest Solicitud de autenticación con credenciales del usuario.
     * @return ResponseEntity con el token JWT o un mensaje de error.
     */
    public ResponseEntity< ? > login( AuthRequest authRequest ) {
        try {
            if ( ( authRequest.getUsername( ) == null || authRequest.getUsername( ).isEmpty( ) ) &&
                    ( authRequest.getEmail( ) == null || authRequest.getEmail( ).isEmpty( ) ) ) {
                return ResponseEntity.status( HttpStatus.BAD_REQUEST ).body( new Message( AuthConstants.CREDENTIALS_REQUIRED ) );
            }

            User user;
            if ( authRequest.getUsername( ) != null && ! authRequest.getUsername( ).isEmpty( ) ) {
                user = userRepository.findByUsername( authRequest.getUsername( ) );
            } else {
                user = userRepository.findByEmail( authRequest.getEmail( ) );
            }

            if ( user == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( new Message( AuthConstants.USER_NOT_EXISTS ) );
            }

            if ( ! user.getPassword( ).equals( authRequest.getPassword( ) ) ) {
                return ResponseEntity.status( HttpStatus.UNAUTHORIZED ).body( new Message( AuthConstants.INVALID_CREDENTIALS ) );
            }

            String token = user.getToken( );
            if ( token == null || ! jwtTokenUtils.isValidToken( token ) ) {
                token = jwtTokenUtils.generateToken( user.getUsername( ) );
                user.setToken( token );
                printMssg( AuthConstants.TOKEN_CREATED_OR_UPDATED );
                userRepository.save( user );
            }

            printMssg( user.getUsername( ) + " logged in" );

            return ResponseEntity.status( HttpStatus.OK ).body( new AuthResponse( token ) );
        } catch ( Exception e ) {
            printMssg( e.getMessage( ) );
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( new Message( AuthConstants.INTERNAL_SERVER_ERROR ) );
        }
    }

    /**
     * Endpoint para registrar un nuevo usuario.
     *
     * @param authRequest Solicitud de autenticación con credenciales del usuario.
     * @return ResponseEntity con el token JWT o un mensaje de error.
     */
    public ResponseEntity< ? > register( AuthRequest authRequest ) {
        User userByEmail = userRepository.findByEmail( authRequest.getEmail( ) );
        if ( userByEmail != null ) {
            return ResponseEntity.status( HttpStatus.CONFLICT )
                    .body( new Message( AuthConstants.EMAIL_ALREADY_EXISTS ) );
        }

        User userByUsername = userRepository.findByUsername( authRequest.getUsername( ) );
        if ( userByUsername != null ) {
            return ResponseEntity.status( HttpStatus.CONFLICT )
                    .body( new Message( AuthConstants.USERNAME_ALREADY_EXISTS ) );
        }


        String token = jwtTokenUtils.generateToken( authRequest.getUsername( ) );
        User user = new User( );
        user.setUsername( authRequest.getUsername( ) );
        user.setEmail( authRequest.getEmail( ) );
        user.setPassword( authRequest.getPassword( ) );
        user.setToken( token );
        userRepository.save( user );

        printMssg( user.getUsername( ) + " registered" );
        return ResponseEntity.status( HttpStatus.CREATED ).body( new AuthResponse( token ) );
    }
}