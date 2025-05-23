package com.auth.security.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Clase de configuración para las propiedades de la aplicación.
 * Utiliza el prefijo "app" para mapear las propiedades definidas en el archivo de configuración.
 */
@Getter
@Setter
@Configuration
@ConfigurationProperties( prefix = "app" )
public class AppProperties {

    /**
     * Autor de la aplicación.
     */
    private String author;

    /**
     * Organización a la que pertenece la aplicación.
     */
    private String organization;

    /**
     * Descripción de la aplicación.
     */
    private String description;

    /**
     * Correo electrónico de contacto.
     */
    private String contactEmail;

    /**
     * Versión de la aplicación.
     */
    private String version;
}