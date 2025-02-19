package com.yowpet.backend.utils.constants;

/**
 * Clase que contiene las constantes de mensajes del sistema.
 */
public class Constants {

    public Constants( ) {
        throw new IllegalStateException( "Utility class" );
    }

    public static final String HELLO_FROM_YOWPET_PROJECT = "🔐 Hello from Yowpet!\n🚀 This endpoint doesn't require a token.\n🔑 Remember: all other endpoints require a valid token, except for login and register. 📝";


    public static final String EMAIL_EXISTENTE = "El correo electrónico ya está registrado";
    public static final String USUARIO_CREADO_EXITOSAMENTE = "Usuario creado con éxito";
    public static final String ERROR_INTERNO_DEL_SERVIDOR = "Error interno del servidor";
    public static final String USUARIO_ELIMINADO_EXITOSAMENTE = "Usuario eliminado con éxito";
    public static final String USUARIO_NO_ENCONTRADO = "Usuario no encontrado";
    public static final String PET_EXISTS = "La mascota con su nombre ya esta asignada a un usuario";
    public static final String PET_CREATED_SUCCESSFULLY = "La mascota fue creada con éxito";
    public static final String RESERVATION_CREADO_EXITOSAMENTE = "Reserva creada con éxito";
    public static final String RESERVATION_CANCELADO_EXITOSAMENTE = "Reserva cancelada con éxito";
    public static final String USUARIO_EXISTE_RESERVATION = "El usuario no existe (reservation)";
    public static final String NO_ES_CUIDADOR = "El usuario no es un cuidador (RESERVATION)";
    public static final String COINCIDENCIA_FECHAS_RESERVATION = "El cuidador ya tiene una reserva en esta fecha";
    public static final String RESERVA_NO_ENCONTRADA = "Reserva no encontrada";
    public static final String RESERVATION_COMPLETED_SUCCESSFULLY = "Reserva completada con éxito";

    public static final String PET_DELETED_SUCCESSFULLY = "Mascota eliminada con éxito";
    public static final String USUARIO_ACTIVADO_COMO_CUIDADOR = " Usuario activado como cuidador";
    public static final String USUARIO_DESACTIVADO_COMO_CUIDADOR = "Usuario desactivado como cuidador";
    public static final String USUARIO_ACTIVADO_COMO_ADMIN = "Usuario activado como administrador";
    public static final String USUARIO_DESACTIVADO_COMO_ADMIN = "Usuario desactivado como administrador";
}