package com.auth.security.service;

import com.auth.security.dto.AuthRequestJWT;
import com.auth.security.model.UserJWT;
import com.auth.security.repository.UserReposJWT;
import com.auth.security.util.AuthConstantsJWT;
import com.auth.security.util.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.auth.security.util.UtilsJWT.printMssg;

/**
 * Servicio para la gestión de Authentication.
 */
@Service
public class AuthServiceJWT {
    private final JwtTokenUtils jwtTokenUtils;
    private final UserReposJWT userRepositoryJWT;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor de AuthService.
     *
     * @param jwtTokenUtils     Utilidad para la gestión de tokens JWT.
     * @param userRepositoryJWT Repositorio de usuarios.
     * @param passwordEncoder   Codificador de contraseñas.
     */
    @Autowired
    public AuthServiceJWT(JwtTokenUtils jwtTokenUtils, UserReposJWT userRepositoryJWT, PasswordEncoder passwordEncoder) {
        this.jwtTokenUtils = jwtTokenUtils;
        this.userRepositoryJWT = userRepositoryJWT;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Endpoint para obtener un el estado del proyecto.
     *
     * @return ResponseEntity con el mensaje del estado del proyecto.
     */
    public ResponseEntity<String> getHello() {
        printMssg(AuthConstantsJWT.HELLO_FROM_AUTH_PROJECT);
        return ResponseEntity.status(HttpStatus.OK).body(AuthConstantsJWT.HELLO_FROM_AUTH_PROJECT);
    }

    /**
     * Endpoint para iniciar sesión.
     *
     * @param authRequestJWT Solicitud de autenticación con credenciales del usuario.
     * @return ResponseEntity con el token JWT o un mensaje de error.
     */
    public ResponseEntity<?> login(AuthRequestJWT authRequestJWT) {
        try {
            String identifier = authRequestJWT.getEmail();

            if (identifier == null || identifier.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthConstantsJWT.CREDENTIALS_REQUIRED);
            }

            if (authRequestJWT.getPassword() == null || authRequestJWT.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthConstantsJWT.CREDENTIALS_REQUIRED);
            }

            // Buscar usuario por email
            UserJWT userJWT = userRepositoryJWT.getUserByEmail(identifier);

            // Si no lo encuentra por email
            if (userJWT == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(AuthConstantsJWT.USER_NOT_EXISTS);
            }

            if (!passwordEncoder.matches(authRequestJWT.getPassword(), userJWT.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(AuthConstantsJWT.INVALID_CREDENTIALS);
            }

            String token = userJWT.getToken();
            if (token == null || !jwtTokenUtils.isValidToken(token)) {
                // Genera el token con el email y el ID
                token = jwtTokenUtils.generateToken(userJWT.getEmail(), userJWT.getId());
                userJWT.setToken(token);
                userRepositoryJWT.UpdateUsertoken(userJWT.getEmail(), token);
            }

            printMssg(userJWT.getEmail() + " logged in");

            return ResponseEntity.status(HttpStatus.OK).body(token);
        } catch (Exception e) {
            printMssg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(AuthConstantsJWT.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para registrar un nuevo usuario.
     *
     * @param authRequestJWT Solicitud de autenticación con credenciales del usuario.
     * @return ResponseEntity con el token JWT o un mensaje de error.
     */
    public ResponseEntity<?> register(AuthRequestJWT authRequestJWT) {
        Optional<UserJWT> userJWTByEmail = Optional.ofNullable(userRepositoryJWT.getUserByEmail(authRequestJWT.getEmail()));

        if (userJWTByEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(AuthConstantsJWT.EMAIL_ALREADY_EXISTS);
        }

        UserJWT userJWT = new UserJWT();
        userJWT.setFirstName(authRequestJWT.getFirstName());
        userJWT.setLastName(authRequestJWT.getLastName());
        userJWT.setEmail(authRequestJWT.getEmail());
        userJWT.setPassword(passwordEncoder.encode(authRequestJWT.getPassword()));

        // Primero crea el usuario sin token
        userRepositoryJWT.createUser(userJWT.getFirstName(),
                userJWT.getLastName(),
                userJWT.getEmail(),
                userJWT.getPassword(),
                userJWT.getCity(),
                userJWT.getAddress(),
                userJWT.getPhonenumber(),
                userJWT.getZipCode(),
                userJWT.getGender(),
                userJWT.getProfilePicture(),
                userJWT.getRole(),
                userJWT.getLanguages(),
                userJWT.getPaymentMethod(),
                userJWT.getBirthDate(),
                null); // Token inicialmente null

        // Obtiene el usuario recién creado para tener el ID
        UserJWT createdUser = userRepositoryJWT.getUserByEmail(authRequestJWT.getEmail());

        // Genera el token con el email y el ID
        String token = jwtTokenUtils.generateToken(createdUser.getEmail(), createdUser.getId());

        // Actualiza el token en la base de datos
        userRepositoryJWT.UpdateUsertoken(createdUser.getEmail(), token);

        printMssg(createdUser.getEmail() + " registered with ID: " + createdUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }

    /**
     * Valida un token JWT.
     *
     * @param token el token JWT a validar
     * @return ResponseEntity con true si el token es válido, false en caso contrario
     */
    public ResponseEntity<Boolean> validateToken(String token) {
        try {
            // Eliminar posibles comillas si el token viene entre comillas
            token = token.replaceAll("^\"|\"$", "");

            boolean isValid = jwtTokenUtils.isValidToken(token);
            printMssg("Token validation result: " + isValid);
            return ResponseEntity.ok(isValid);
        } catch (Exception e) {
            printMssg("Error validating token: " + e.getMessage());
            return ResponseEntity.ok(false);
        }
    }
}