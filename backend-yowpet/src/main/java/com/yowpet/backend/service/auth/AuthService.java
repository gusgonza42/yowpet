package com.yowpet.backend.service.auth;

import com.yowpet.backend.dto.LoginRequestDTO;
import com.yowpet.backend.dto.LoginResponseDTO;
import com.yowpet.backend.dto.RegisterRequestDTO;
import com.yowpet.backend.dto.RegisterResponseDTO;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService( UserRepository userRepository , BCryptPasswordEncoder passwordEncoder ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity< ? > login( LoginRequestDTO loginRequestDTO ) {
        User user = userRepository.findByUsername( loginRequestDTO.getUsername( ) );
        if ( user != null && passwordEncoder.matches( loginRequestDTO.getPassword( ) , user.getPassword( ) ) ) {
            LoginResponseDTO responseDTO = new LoginResponseDTO( );
            responseDTO.setId( user.getId( ) );
            responseDTO.setUsername( user.getUsername( ) );
            responseDTO.setEmail( user.getEmail( ) );
            responseDTO.setToken( user.getToken( ) );
            return ResponseEntity.status( HttpStatus.OK ).body( responseDTO );
        } else {
            return ResponseEntity.status( HttpStatus.UNAUTHORIZED ).body( null );
        }
    }

    public ResponseEntity< RegisterResponseDTO > register( RegisterRequestDTO registerRequestDTO ) {
        User existingUser = userRepository.findByUsername( registerRequestDTO.getUsername( ) );
        if ( existingUser != null ) {
            return ResponseEntity.status( HttpStatus.CONFLICT ).body( null );
        }
        User user = new User( );
        user.setUsername( registerRequestDTO.getUsername( ) );
        user.setEmail( registerRequestDTO.getEmail( ) );
        user.setPassword( passwordEncoder.encode( registerRequestDTO.getPassword( ) ) );
        user.setFirstName( registerRequestDTO.getFirstName( ) );
        user.setLastName( registerRequestDTO.getLastName( ) );
        userRepository.save( user );

        RegisterResponseDTO responseDTO = new RegisterResponseDTO( );
        responseDTO.setId( user.getId( ) );
        responseDTO.setUsername( user.getUsername( ) );
        responseDTO.setEmail( user.getEmail( ) );
        return ResponseEntity.status( HttpStatus.CREATED ).body( responseDTO );
    }
}