package com.yowpet.backend.service.auth;

import com.yowpet.backend.exception.UnauthorizedException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class JwtValidationService {
    private final RestTemplate restTemplate;

    private final String jwtServiceUrl = "http://localhost:8081"; // Puerto del microservicio JWT

    public JwtValidationService() {
        this.restTemplate = new RestTemplate();
    }

    public Integer extractUserIdFromToken(String token) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", token);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Integer> response = restTemplate.exchange(
                    jwtServiceUrl + "/auth/extract-userid",
                    HttpMethod.GET,
                    entity,
                    Integer.class
            );

            return response.getBody();
        } catch (Exception e) {
            throw new UnauthorizedException("Token inválido");
        }
    }
}