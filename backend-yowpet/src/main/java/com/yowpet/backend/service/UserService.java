package com.yowpet.backend.service;

import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.UserRepository;
import com.yowpet.backend.utils.constants.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Servicio para manejar las operaciones relacionadas con los usuarios.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    /**
     * Constructor para inyectar el repositorio de usuarios.
     *
     * @param userRepository el repositorio de usuarios
     */
    public UserService( UserRepository userRepository ) {
        this.userRepository = userRepository;
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param user el usuario a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity< String > createUser( @RequestBody User user ) {
        try {
            if( userRepository.findByEmail( user.getEmail( ) ).isPresent( ) ) {
                return ResponseEntity.status( HttpStatus.CONFLICT ).body( Constants.EMAIL_EXISTENTE );
            }
            userRepository.save( user );
            return ResponseEntity.status( HttpStatus.CREATED ).body( Constants.USUARIO_CREADO_EXITOSAMENTE );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( Constants.ERROR_INTERNO_DEL_SERVIDOR );
        }
    }

    /**
     * Obtiene todos los usuarios activos.
     *
     * @return una respuesta HTTP con la lista de usuarios
     */
    public ResponseEntity< List< User > > getAllUsers( ) {
        try {
            List< User > users = userRepository.findByStatus( User.status_active );
            return ResponseEntity.status( HttpStatus.OK ).body( users );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Obtiene un usuario por su ID.
     *
     * @param id el ID del usuario
     * @return una respuesta HTTP con el usuario encontrado
     */
    public ResponseEntity< User > getUserById( Long id ) {
        try {
            User user = userRepository.findById( id ).orElse( null );
            return ResponseEntity.status( HttpStatus.OK ).body( user );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Actualiza un usuario existente.
     *
     * @param id   el ID del usuario a actualizar
     * @param user los nuevos datos del usuario
     * @return una respuesta HTTP con el usuario actualizado
     */
    public ResponseEntity< User > updateUser( Long id, User user ) {
        try {
            User userToUpdate = userRepository.findById( id ).orElse( null );
            if( userToUpdate == null ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( null );
            }
            userToUpdate.setFirstName( user.getFirstName( ) );
            userToUpdate.setLastName( user.getLastName( ) );
            userToUpdate.setEmail( user.getEmail( ) );
            userToUpdate.setPassword( user.getPassword( ) );
            userToUpdate.setCity( user.getCity( ) );
            userToUpdate.setGender( user.getGender( ) );
            userToUpdate.setAddress( user.getAddress( ) );
            userToUpdate.setPhoneNumber( user.getPhoneNumber( ) );
            userToUpdate.setBirthDate( user.getBirthDate( ) );
            userToUpdate.setUpdatedAt( new Date( ) );
            User updatedUser = userRepository.save( userToUpdate );
            return ResponseEntity.status( HttpStatus.OK ).body( updatedUser );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( null );
        }
    }

    /**
     * Elimina (lógicamente) un usuario por su ID.
     *
     * @param id el ID del usuario a eliminar
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity< String > deleteUser( Long id ) {
        try {
            Optional< User > optionalUser = userRepository.findById( id );
            if( optionalUser.isPresent( ) ) {
                User user = optionalUser.get( );
                user.setStatus( User.status_inactive );
                user.setDeletedAt( new Date( ) );
                user.setUpdatedAt( new Date( ) );
                userRepository.save( user );
                return ResponseEntity.status( HttpStatus.OK ).body( Constants.USUARIO_ELIMINADO_EXITOSAMENTE );
            } else {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).body( Constants.USUARIO_NO_ENCONTRADO );
            }
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( Constants.ERROR_INTERNO_DEL_SERVIDOR );
        }
    }
}