package com.auth.security.util;

/**
 * Clase de constantes de autenticación.
 */
public class AuthConstantsJWT {

    /**
     * Constructor privado para evitar la instanciación de la clase de utilidades.
     * Lanza una IllegalStateException si se intenta instanciar.
     */
    public AuthConstantsJWT( ) {
        throw new IllegalStateException( "Clase de utilidad" );
    }

    /**
     * Mensaje de saludo desde el proyecto de autenticación.
     * Indica que este endpoint no requiere un token.
     * Recuerda que todos los demás endpoints requieren un token válido, excepto login y register.
     */
    public static final String HELLO_FROM_AUTH_PROJECT = "🔐 ¡Hola desde el Proyecto de Autenticación!\n🛡️ Este endpoint no requiere un token.\n🔑 Recuerda: todos los demás endpoints requieren un token válido, excepto hello, validation, login y register. 📝";

    /**
     * Mensaje de error cuando el usuario no existe.
     * Solicita intentar nuevamente con un nombre de usuario o correo electrónico diferente.
     */
    public static final String USER_NOT_EXISTS = "⚠️ El usuario no existe. Por favor, intenta nuevamente con un nombre de usuario o correo electrónico diferente.";

    /**
     * Mensaje de error cuando se requieren credenciales.
     * Indica que se necesitan nombre de usuario, correo electrónico y contraseña.
     */
    public static final String CREDENTIALS_REQUIRED = "⚠️ El nombre de usuario, correo electrónico y contraseña son requeridos.";

    /**
     * Mensaje de error cuando las credenciales son inválidas.
     * Solicita intentar nuevamente con un nombre de usuario, correo electrónico o contraseña diferente.
     */
    public static final String INVALID_CREDENTIALS = "🚫 Nombre de usuario, correo electrónico o contraseña inválidos. Por favor, intenta nuevamente.";

    /**
     * Mensaje de éxito cuando el token ha sido creado o actualizado correctamente.
     */
    public static final String TOKEN_CREATED_OR_UPDATED = "✅ ¡El token ha sido creado o actualizado exitosamente!";

    /**
     * Mensaje de error cuando ocurre un error interno del servidor.
     * Solicita intentar nuevamente más tarde.
     */
    public static final String INTERNAL_SERVER_ERROR = "⚠️ Ha ocurrido un error inesperado. Por favor, intenta nuevamente más tarde.";

    /**
     * Mensaje de error cuando el correo electrónico ya está en uso.
     * Solicita intentar nuevamente con un correo electrónico diferente.
     */
    public static final String EMAIL_ALREADY_EXISTS = "⚠️ El correo electrónico ya está en uso. Por favor, intenta nuevamente con un correo electrónico diferente.";

    /**
     * Mensaje de error cuando el nombre de usuario ya está en uso.
     * Solicita intentar nuevamente con un nombre de usuario diferente.
     */
    public static final String USERNAME_ALREADY_EXISTS = "⚠️ El nombre de usuario ya está en uso. Por favor, intenta nuevamente con un nombre de usuario diferente.";

}