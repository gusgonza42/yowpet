package com.yowpet.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration for the application.
 * Allows public access to all routes and disables CSRF.
 */
@Configuration
public class SecurityConfig {

    /**
     * Defines the security filter chain.
     *
     * @param http the HttpSecurity object to configure HTTP security
     * @return the configured security filter chain
     * @throws Exception if an error occurs during the configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain( HttpSecurity http ) throws Exception {
        http.authorizeHttpRequests( authorize -> authorize.anyRequest( ).permitAll( ) // Allows public access to all routes
        ).csrf( csrf -> csrf.disable( ) ); // Disables CSRF to simplify requests
        return http.build( );
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder( ) {
        return new BCryptPasswordEncoder( );
    }
}