package com.yowpet.backend.controller;

import com.yowpet.backend.model.User;
import com.yowpet.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para manejar las operaciones relacionadas con los usuarios.
 */
@RestController
@RequestMapping ( "/yowpet/user" )
public class UserController {

    private final UserService userService;

    /**
     * Constructor para inyectar el servicio de usuarios.
     *
     * @param userService el servicio de usuarios
     */
    public UserController( UserService userService ) {
        this.userService = userService;
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param user el usuario a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    @PostMapping ( "/create" )
    public ResponseEntity< String > createUser( @RequestBody User user ) {
        return userService.createUser( user );
    }

    /**
     * Obtiene todos los usuarios.
     *
     * @return una respuesta HTTP con la lista de usuarios
     */
    @GetMapping ( "/all" )
    public ResponseEntity< List< User > > getAllUsers( ) {
        return userService.getAllUsers( );
    }

    /**
     * Obtiene un usuario por su ID.
     *
     * @param id el ID del usuario
     * @return una respuesta HTTP con el usuario encontrado
     */
    @GetMapping ( "/{id}" )
    public ResponseEntity< User > getUserById( @PathVariable Long id ) {
        return userService.getUserById( id );
    }

    /**
     * Actualiza un usuario existente.
     *
     * @param id   el ID del usuario a actualizar
     * @param user los nuevos datos del usuario
     * @return una respuesta HTTP con el usuario actualizado
     */
    @PutMapping ( "/update/{id}" )
    public ResponseEntity< User > updateUser( @PathVariable Long id, @RequestBody User user ) {
        return userService.updateUser( id, user );
    }

    /**
     * Elimina un usuario por su ID.
     *
     * @param id el ID del usuario a eliminar
     * @return una respuesta HTTP con el resultado de la operación
     */
    @DeleteMapping ( "/delete/{id}" )
    public ResponseEntity< String > deleteUser( @PathVariable Long id ) {
        return userService.deleteUser( id );
    }
}