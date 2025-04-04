package com.auth.security.config;

import com.auth.security.exception.JwtAuthenticationEntryPoint;
import com.auth.security.filter.JwtRequestFilter;
import com.auth.security.util.JwtTokenUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuración de seguridad para la aplicación.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtTokenUtils jwtTokenUtils;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    /**
     * Constructor de SecurityConfig.
     *
     * @param jwtTokenUtils               utilidad para la gestión de tokens JWT
     * @param jwtAuthenticationEntryPoint punto de entrada de autenticación JWT
     */
    public SecurityConfig( JwtTokenUtils jwtTokenUtils , JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint ) {
        this.jwtTokenUtils = jwtTokenUtils;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    /**
     * Bean para proveer un codificador de contraseñas.
     *
     * @return un codificador de contraseñas BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder( ) {
        return new BCryptPasswordEncoder( );
    }

    /**
     * Configura la cadena de filtros de seguridad.
     *
     * @param http el objeto HttpSecurity para configurar la seguridad HTTP
     * @return la cadena de filtros de seguridad configurada
     * @throws Exception sí ocurre un error durante la configuración
     */
    @Bean
    public SecurityFilterChain securityFilterChain( HttpSecurity http ) throws Exception {
        http.csrf( AbstractHttpConfigurer::disable )
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers( "/auth/login" , "/auth/register" , "/auth/hello" , "/auth/validation" ).permitAll( )
                        .anyRequest( ).authenticated( )
                )
                .exceptionHandling( exception -> exception
                        .authenticationEntryPoint( jwtAuthenticationEntryPoint )
                )
                .addFilterBefore( new JwtRequestFilter( jwtTokenUtils ) , UsernamePasswordAuthenticationFilter.class );
        return http.build( );
    }
}