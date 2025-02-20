package com.auth.security.util;

/**
 * Clase de constantes de autenticación.
 */
public class AuthConstants {

    /**
     * Constructor privado para evitar la instanciación de la clase de utilidades.
     * Lanza una IllegalStateException si se intenta instanciar.
     */
    public AuthConstants( ) {
        throw new IllegalStateException( "Utility class" );
    }

    /**
     * Mensaje de saludo desde el proyecto de autenticación.
     * Indica que este endpoint no requiere un token.
     * Recuerda que todos los demás endpoints requieren un token válido, excepto login y register.
     */
    public static final String HELLO_FROM_AUTH_PROJECT = "🔐 Hello from Auth Project!\n��� This endpoint doesn't require a token.\n🔑 Remember: all other endpoints require a valid token, except for login and register. 📝";

    /**
     * Mensaje de error cuando el usuario no existe.
     * Solicita intentar nuevamente con un nombre de usuario o correo electrónico diferente.
     */
    public static final String USER_NOT_EXISTS = "⚠️ The user does not exist. Please try again with a different username or email.";

    /**
     * Mensaje de error cuando se requieren credenciales.
     * Indica que se necesitan nombre de usuario, correo electrónico y contraseña.
     */
    public static final String CREDENTIALS_REQUIRED = "⚠️ Username, email, and password are required.";

    /**
     * Mensaje de error cuando las credenciales son inválidas.
     * Solicita intentar nuevamente con un nombre de usuario, correo electrónico o contraseña diferente.
     */
    public static final String INVALID_CREDENTIALS = "🚫 Invalid username, email, or password. Please try again.";

    /**
     * Mensaje de éxito cuando el token ha sido creado o actualizado correctamente.
     */
    public static final String TOKEN_CREATED_OR_UPDATED = "✅ Token has been created or updated successfully!";

    /**
     * Mensaje de error cuando ocurre un error interno del servidor.
     * Solicita intentar nuevamente más tarde.
     */
    public static final String INTERNAL_SERVER_ERROR = "⚠️ An unexpected error occurred. Please try again later.";

    /**
     * Mensaje de error cuando el correo electrónico ya está en uso.
     * Solicita intentar nuevamente con un correo electrónico diferente.
     */
    public static final String EMAIL_ALREADY_EXISTS = "⚠️ The email is already in use. Please try again with a different email.";

    /**
     * Mensaje de error cuando el nombre de usuario ya está en uso.
     * Solicita intentar nuevamente con un nombre de usuario diferente.
     */
    public static final String USERNAME_ALREADY_EXISTS = "⚠️ The username is already in use. Please try again with a different username.";

}