package com.auth.security.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Clase de utilidades que proporciona métodos auxiliares para la aplicación.
 * Esta clase no debe ser instanciada.
 */
public class Utils {

    /**
     * Constructor privado para evitar la instanciación de la clase de utilidades.
     * Lanza una IllegalStateException si se intenta instanciar.
     */
    public Utils( ) {
        throw new IllegalStateException( "Utility class" );
    }

    // Formateador de fecha y hora para generar timestamps.
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "yyyy-MM-dd HH:mm:ss" );

    /**
     * Imprime un mensaje en la consola con un formato específico que incluye
     * un timestamp, el nombre de la clase y el método desde donde se llamó.
     * Utiliza códigos de escape ANSI para colorear la salida.
     *
     * @param message El mensaje a imprimir en la consola.
     */
    public static void printMssg( String message ) {
        String timestamp = LocalDateTime.now( ).format( formatter );
        String method = Thread.currentThread( ).getStackTrace( )[ 2 ].getMethodName( );
        String className = Thread.currentThread( ).getStackTrace( )[ 2 ].getClassName( );

        // Códigos de escape ANSI para colores
        String reset = "\u001B[0m";
        String red = "\u001B[31m";
        String green = "\u001B[32m";
        String yellow = "\u001B[33m";
        String blue = "\u001B[34m";
        String purple = "\u001B[35m";
        String cyan = "\u001B[36m";

        System.out.println( blue + "🌌 ¡Operación exitosa! 🌟  O " + red + "💥 ERROR EN LA NAVE 🚨" + reset + " - \n" +
                "[" + yellow + timestamp + reset + " - " + cyan + className + reset + "." + green + method + reset + "]: \n\n" +
                purple + message + reset + "\n\n" +
                "🚀🛸  || 🚧🛠️" + "\n" +
                "- - - - - - - END PRINT MESSAGE - - - - - - - \n" );
    }
}