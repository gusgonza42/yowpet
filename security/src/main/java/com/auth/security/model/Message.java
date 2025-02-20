package com.auth.security.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Clase que representa un mensaje en el sistema.
 */
@Getter
@Setter
public class Message {

    /**
     * Contenido del mensaje.
     */
    private String message;

    /**
     * Constructor de la clase Message.
     *
     * @param message el contenido del mensaje
     */
    public Message( String message ) {
        this.message = message;
    }
}