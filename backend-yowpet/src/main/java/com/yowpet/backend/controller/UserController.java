package com.yowpet.backend.controller;

import com.yowpet.backend.model.User;
import com.yowpet.backend.service.UserService;
import com.yowpet.backend.service.auth.JwtValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para manejar las operaciones relacionadas con los usuarios.
 */
@RestController
@RequestMapping("/yowpet/user")
public class UserController {

    private final UserService userService;
    private final JwtValidationService jwtValidationService;


    /**
     * Constructor para inyectar el servicio de usuarios.
     *
     * @param userService el servicio de usuarios
     */
    public UserController(UserService userService, JwtValidationService jwtValidationService) {
        this.userService = userService;
        this.jwtValidationService = jwtValidationService;
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param user el usuario a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    /**
     * Obtiene todos los usuarios.
     *
     * @return una respuesta HTTP con la lista de usuarios
     */
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            Integer userId = jwtValidationService.extractUserIdFromToken(token);
            return userService.getUserById(userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Obtiene un usuario por su ID.
     *
     * @param id el ID del usuario
     * @return una respuesta HTTP con el usuario encontrado
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    /**
     * Actualiza un usuario existente.
     *
     * @param id   el ID del usuario a actualizar
     * @param user los nuevos datos del usuario
     * @return una respuesta HTTP con el usuario actualizado
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    /**
     * Elimina un usuario por su ID.
     *
     * @param id el ID del usuario a eliminar
     * @return una respuesta HTTP con el resultado de la operación
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

    /**
     * Activa un usuario como administrador por ID.
     *
     * @param id del ID del administrador que se activará
     * @return una respuesta HTTP con el resultado de la operación
     */
    @PostMapping("/admin/activate/{id}")
    public ResponseEntity<String> activateAdmin(@PathVariable int id) {
        return userService.activateAdmin(id);
    }

    /**
     * Desactiva un usuario como administrador por ID y lo pasa a usuario.
     *
     * @param id del ID del administrador que se desactivará
     * @return una respuesta HTTP con el resultado de la operación
     */
    @DeleteMapping("/admin/disabled/{id}")
    public ResponseEntity<String> disabledAdmin(@PathVariable int id) {
        return userService.disabledAdmin(id);
    }

}