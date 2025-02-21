package com.yowpet.backend.service.auth;

import com.yowpet.backend.dto.LoginRequestDTO;
import com.yowpet.backend.dto.LoginResponseDTO;
import com.yowpet.backend.dto.RegisterRequestDTO;
import com.yowpet.backend.dto.RegisterResponseDTO;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.UserRepository;
import com.yowpet.backend.utils.constants.YowPetConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import static com.yowpet.backend.utils.Utils.printMssg;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final WebClient webClient;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, WebClient webClient) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.webClient = webClient;
    }

    /*
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
    */
    public ResponseEntity<?> login(LoginRequestDTO loginRequestDTO) {
        try {
            ResponseEntity<LoginResponseDTO> response = webClient.post()
                    .uri("/login")
                    .bodyValue(loginRequestDTO)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, clientResponse ->
                            clientResponse.bodyToMono(String.class).flatMap(errorBody ->
                                    Mono.error(new WebClientResponseException(
                                            errorBody,
                                            clientResponse.statusCode().value(),
                                            clientResponse.statusCode().toString(),
                                            null, null, null
                                    ))
                            )
                    )
                    .toEntity(LoginResponseDTO.class)
                    .block();

            return ResponseEntity.ok(response.getBody());

        } catch (WebClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("🚨 Error inesperado.");
        }

    }

    public ResponseEntity<?> register(RegisterRequestDTO registerRequestDTO) {
        System.out.println("Registrando usuario: " + registerRequestDTO);
        try {
            registerRequestDTO.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
            registerRequestDTO.setRole(User.role_user);
            registerRequestDTO.setStatus(User.status_active);
            ResponseEntity<RegisterResponseDTO> response = webClient.post()
                    .uri("/register")
                    .bodyValue(registerRequestDTO)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, clientResponse ->
                            clientResponse.bodyToMono(String.class).flatMap(errorBody ->
                                    Mono.error(new WebClientResponseException(
                                            errorBody,
                                            clientResponse.statusCode().value(),
                                            clientResponse.statusCode().toString(),
                                            null, null, null
                                    ))
                            )
                    )
                    .toEntity(RegisterResponseDTO.class)
                    .block();

            return ResponseEntity.status(HttpStatus.CREATED).body(response.getBody());

        } catch (WebClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(YowPetConstants.ERROR_INTERNO_DEL_SERVIDOR);
        }
    }

}