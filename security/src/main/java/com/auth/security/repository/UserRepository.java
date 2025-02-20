package com.auth.security.repository;

import com.auth.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio para la entidad User.
 * Proporciona métodos para realizar operaciones CRUD en la base de datos.
 */
public interface UserRepository extends JpaRepository< User, Long > {

    /**
     * Busca un usuario por su correo electrónico.
     *
     * @param email el correo electrónico del usuario
     * @return el usuario encontrado o null si no se encuentra
     */
    User findByEmail( String email );

    /**
     * Busca un usuario por su nombre de usuario.
     *
     * @param username el nombre de usuario
     * @return el usuario encontrado o null si no se encuentra
     */
    User findByUsername( String username );
}