package com.yowpet.backend.service.auth;

import com.yowpet.backend.dto.AuthRequestDTO;
import com.yowpet.backend.dto.AuthResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class AuthService {

    private final WebClient webClient;

    public AuthService(WebClient.Builder webClientBuilder, @Value("${auth.service.url}") String authServiceUrl) {
        this.webClient = webClientBuilder
                .baseUrl(authServiceUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public ResponseEntity<?> register(AuthRequestDTO request) {
        return executeAuthRequest("/auth/register", request, HttpStatus.CREATED, "Registro exitoso");
    }

    public ResponseEntity<?> login(AuthRequestDTO request) {
        return executeAuthRequest("/auth/login", request, HttpStatus.OK, "Inicio de sesión exitoso");
    }

    private ResponseEntity<?> executeAuthRequest(String uri, AuthRequestDTO request, HttpStatus successStatus, String successMessage) {
        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .map(token -> {
                    if (token == null || token.trim().isEmpty()) {
                        throw new WebClientResponseException(HttpStatus.UNAUTHORIZED.value(),
                            "Credenciales inválidas", null, null, null);
                    }
                    AuthResponseDTO response = new AuthResponseDTO();
                    response.setToken(token.replace("\"", ""));
                    response.setType("Bearer");
                    response.setSuccess(true);
                    response.setMessage(successMessage);
                    return ResponseEntity.status(successStatus)
                            .body(response);
                })
                .onErrorResume(e -> {
                    AuthResponseDTO errorResponse = new AuthResponseDTO();
                    if (e instanceof WebClientResponseException) {
                        WebClientResponseException wcException = (WebClientResponseException) e;
                        errorResponse.setMessage(wcException.getResponseBodyAsString().replace("\"", ""));
                        errorResponse.setSuccess(false);
                        return Mono.just(ResponseEntity.status(wcException.getStatusCode())
                                .body(errorResponse));
                    }
                    errorResponse.setMessage("Error de conexión con el servicio");
                    errorResponse.setSuccess(false);
                    return Mono.just(ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                            .body(errorResponse));
                })
                .block();
    }
}