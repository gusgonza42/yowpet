package com.auth.security.service;

import com.auth.security.dto.AuthLoginRequestDTO;
import com.auth.security.dto.AuthLoginResponseDTO;
import com.auth.security.dto.AuthRegisterRequestDTO;
import com.auth.security.dto.AuthRegisterResponseDTO;
import com.auth.security.model.Message;
import com.auth.security.model.User;
import com.auth.security.repository.UserRepository;
import com.auth.security.util.AuthConstants;
import com.auth.security.util.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.auth.security.util.Utils.printMssg;

/**
 * Servicio para la gestión de Authentication.
 */
@Service
public class AuthServiceJWT {
    private final JwtTokenUtils jwtTokenUtils;
    private final UserRepository userRepository;

    /**
     * Constructor de AuthService.
     *
     * @param jwtTokenUtils  Utilidad para la gestión de tokens JWT.
     * @param userRepository Repositorio de usuarios.
     */
    @Autowired
    public AuthServiceJWT(JwtTokenUtils jwtTokenUtils, UserRepository userRepository) {
        this.jwtTokenUtils = jwtTokenUtils;
        this.userRepository = userRepository;
    }

    /**
     * Endpoint para obtener un el estado del proyecto.
     *
     * @return ResponseEntity con el mensaje del estado del proyecto.
     */
    public ResponseEntity<String> getHello() {
        printMssg(AuthConstants.HELLO_FROM_AUTH_PROJECT);
        return ResponseEntity.status(HttpStatus.OK).body(AuthConstants.HELLO_FROM_AUTH_PROJECT);
    }

    /**
     * Endpoint para iniciar sesión.
     *
     * @param authLoginRequestDTO Solicitud de autenticación con credenciales del usuario.
     * @return ResponseEntity con el token JWT o un mensaje de error.
     */
    public ResponseEntity<?> login(AuthLoginRequestDTO authLoginRequestDTO) {
        try {
            if ((authLoginRequestDTO.getUsername() == null || authLoginRequestDTO.getUsername().isEmpty()) &&
                    (authLoginRequestDTO.getEmail() == null || authLoginRequestDTO.getEmail().isEmpty())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthConstants.CREDENTIALS_REQUIRED);
            }

            User user;
            if (authLoginRequestDTO.getUsername() != null && !authLoginRequestDTO.getUsername().isEmpty()) {
                user = userRepository.findByUsername(authLoginRequestDTO.getUsername());
            } else {
                user = userRepository.findByEmail(authLoginRequestDTO.getEmail());
            }

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(AuthConstants.USER_NOT_EXISTS);
            }

            if (!user.getPassword().equals(authLoginRequestDTO.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(AuthConstants.INVALID_CREDENTIALS);
            }

            String token = user.getToken();
            if (token == null || !jwtTokenUtils.isValidToken(token)) {
                token = jwtTokenUtils.generateToken(user.getUsername());
                user.setToken(token);
                printMssg(AuthConstants.TOKEN_CREATED_OR_UPDATED);
                userRepository.save(user);
            }

            printMssg(user.getUsername() + " logged in");

            return ResponseEntity.status(HttpStatus.OK).body(new AuthLoginResponseDTO(token));
        } catch (Exception e) {
            printMssg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuthConstants.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para registrar un nuevo usuario.
     *
     * @param authRegisterRequestDTO Solicitud de autenticación con credenciales del usuario.
     * @return ResponseEntity con el token JWT o un mensaje de error.
     */
    public ResponseEntity<?> register(AuthRegisterRequestDTO authRegisterRequestDTO) {
        printMssg("Registering user: " + authRegisterRequestDTO.getPassword());
        User userByEmail = userRepository.findByEmail(authRegisterRequestDTO.getEmail());
        if (userByEmail != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new Message(AuthConstants.EMAIL_ALREADY_EXISTS));
        }

        User userByUsername = userRepository.findByUsername(authRegisterRequestDTO.getUsername());
        if (userByUsername != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new Message(AuthConstants.USERNAME_ALREADY_EXISTS));
        }


        String token = jwtTokenUtils.generateToken(authRegisterRequestDTO.getUsername());
        User user = new User();
        user.setUsername(authRegisterRequestDTO.getUsername());
        user.setEmail(authRegisterRequestDTO.getEmail());
        user.setPassword(authRegisterRequestDTO.getPassword());
        user.setToken(token);
        user.setRole(2);
        user.setStatus(1);
        user.setCreatedAt(new Date());
        userRepository.save(user);

        printMssg(user.getUsername() + " registered");
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthRegisterResponseDTO(token));
    }
}