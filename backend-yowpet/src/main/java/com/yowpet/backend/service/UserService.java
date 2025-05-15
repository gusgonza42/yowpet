package com.yowpet.backend.service;

import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.UserRepo;
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

    private final UserRepo userRepository;

    /**
     * Constructor para inyectar el repositorio de usuarios.
     *
     * @param userRepository el repositorio de usuarios
     */
    public UserService(UserRepo userRepository) {

        this.userRepository = userRepository;
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param user el usuario a crear
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {

            Optional<User> usuario = Optional.ofNullable(userRepository.getUserByEmail(user.getEmail()));

            if (usuario.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(Constants.EMAIL_EXISTENTE);
            }
            userRepository.createUser(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getCity(),
                    user.getAddress(),
                    user.getTelephone(),
                    user.getZipCode(),
                    user.getGender(),
                    user.getProfilePicture(),
                    user.getRole(),
                    user.getLanguages(),
                    user.getPaymentMethod(),
                    user.getBirthDate());
            return ResponseEntity.status(HttpStatus.CREATED).body(Constants.USUARIO_CREADO_EXITOSAMENTE);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Constants.ERROR_INTERNO_DEL_SERVIDOR);
        }
    }

    /**
     * Obtiene todos los usuarios activos.
     *
     * @return una respuesta HTTP con la lista de usuarios
     */
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            Optional<List<User>> users = Optional.ofNullable(userRepository.getActiveUsers());
            if (users.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(users.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Obtiene un usuario por su ID.
     *
     * @param id el ID del usuario
     * @return una respuesta HTTP con el usuario encontrado
     */
    public ResponseEntity<User> getUserById(int id) {
        try {
            Optional<User> user = Optional.ofNullable(userRepository.getUser(id));
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(user.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Actualiza un usuario existente.
     *
     * @param id   el ID del usuario a actualizar
     * @param user los nuevos datos del usuario
     * @return una respuesta HTTP con el usuario actualizado
     */
    public ResponseEntity<User> updateUser(int id, User user) {
        try {
            User userToUpdate = userRepository.getUser(id);
            if (userToUpdate == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            userToUpdate.setFirstName(user.getFirstName());
            userToUpdate.setLastName(user.getLastName());
            // Eliminar la línea de username
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setAddress(user.getAddress());
            userToUpdate.setTelephone(user.getTelephone());
            userToUpdate.setBirthDate(user.getBirthDate());
            userToUpdate.setCity(user.getCity());
            userToUpdate.setUpdatedAt(new Date());

            userRepository.updateUser(
                    userToUpdate.getId(),
                    userToUpdate.getFirstName(),
                    userToUpdate.getLastName(),
                    userToUpdate.getEmail(),
                    userToUpdate.getAddress(),
                    userToUpdate.getTelephone(),
                    userToUpdate.getBirthDate(),
                    userToUpdate.getCity()
            );
            return ResponseEntity.status(HttpStatus.OK).body(userToUpdate);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Elimina (lógicamente) un usuario por su ID.
     *
     * @param id el ID del usuario a eliminar
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity<String> deleteUser(int id) {
        try {
            Optional<User> optionalUser = Optional.ofNullable(userRepository.getUser(id));
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setStatus(User.STATUS_INACTIVE);
                user.setDeletedAt(new Date());
                user.setUpdatedAt(new Date());
                userRepository.deleteUser(
                        user.getId()
                );
                return ResponseEntity.status(HttpStatus.OK).body(Constants.USUARIO_ELIMINADO_EXITOSAMENTE);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Constants.USUARIO_NO_ENCONTRADO);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Constants.ERROR_INTERNO_DEL_SERVIDOR);
        }
    }

    /**
     * Activa un usuario como administrador.
     *
     * @param id el ID del usuario a activar
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity<String> activateAdmin(int id) {
        try {
            User user = userRepository.getUser(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Constants.USUARIO_NO_ENCONTRADO);
            }
            user.setRole(User.ROLE_ADMIN);
            user.setUpdatedAt(new Date());

            userRepository.toAdmin(user.getId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(Constants.USUARIO_ACTIVADO_COMO_ADMIN);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Constants.ERROR_INTERNO_DEL_SERVIDOR);
        }
    }

    /**
     * Desactiva un usuario como administrador.
     *
     * @param id el ID del usuario a desactivar
     * @return una respuesta HTTP con el resultado de la operación
     */
    public ResponseEntity<String> disabledAdmin(int id) {
        try {
            User user = userRepository.getUser(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Constants.USUARIO_NO_ENCONTRADO);
            }
            user.setUpdatedAt(new Date());
            user.setRole(User.ROLE_USER);
            userRepository.unadmin(user.getId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(Constants.USUARIO_DESACTIVADO_COMO_ADMIN);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Constants.ERROR_INTERNO_DEL_SERVIDOR);
        }
    }


}