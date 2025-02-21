package com.yowpet.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    String authUrl = "http://localhost:8081/auth";

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl(authUrl)
                .build();
    }
}
