package com.yowpet.backend.repository;

import com.yowpet.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para manejar las operaciones relacionadas con los usuarios.
 */
@Repository
public interface UserRepository extends JpaRepository< User, Long > {

    /**
     * Encuentra un usuario por su correo electrónico.
     *
     * @param email el correo electrónico del usuario
     * @return un Optional que contiene el usuario si se encuentra, o vacío si no
     */
    Optional< User > findByEmail( String email );

    /**
     * Encuentra todos los usuarios por su estado.
     *
     * @param status el estado de los usuarios a buscar
     * @return una lista de usuarios con el estado especificado
     */
    List< User > findByStatus( int status );

    User findByUsername( String username );
}