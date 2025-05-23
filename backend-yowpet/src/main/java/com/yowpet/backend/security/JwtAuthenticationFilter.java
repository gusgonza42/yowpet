package com.yowpet.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final WebClient webClient;

    public JwtAuthenticationFilter(WebClient.Builder webClientBuilder, String authServiceUrl) {
        this.webClient = webClientBuilder
                .baseUrl(authServiceUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        // No validar token para rutas públicas
        if (path.equals("/yowpet/login") || path.equals("/yowpet/register") || path.equals("/yowpet/hello") ||
                path.startsWith("/swagger-ui/") || path.startsWith("/v3/api-docs/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                // Llamar al microservicio para validar el token
                // Enviando el token directamente como cadena en formato JSON
                Boolean isValid = webClient.post()
                        .uri("/auth/validation")
                        .bodyValue("\"" + token + "\"")  // Enviamos el token como string entre comillas
                        .retrieve()
                        .bodyToMono(Boolean.class)
                        .block();

                if (isValid != null && isValid) {
                    // Si el token es válido, establecer la autenticación
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            "user", null, Collections.singletonList(new SimpleGrantedAuthority("USER"))
                    );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    filterChain.doFilter(request, response);
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getWriter().write("{\"mensaje\":\"Token inválido\",\"exito\":false}");
                }
            } catch (WebClientResponseException e) {
                response.setStatus(e.getStatusCode().value());
                response.setContentType("application/json");
                response.getWriter().write("{\"mensaje\":\"Error al validar el token: " + e.getStatusText() + "\",\"exito\":false}");
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.setContentType("application/json");
                response.getWriter().write("{\"mensaje\":\"Error del servidor al validar el token\",\"exito\":false}");
            }
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"mensaje\":\"Token de autenticación no proporcionado\",\"exito\":false}");
        }
    }
}