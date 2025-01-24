package com.yowpet.backend.repository;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repositorio JPA para manejar las operaciones relacionadas con las mascotas.
 */
public interface PetRepository extends JpaRepository< Pet, Long > {

    /**
     * Verifica si existe una mascota con el mismo nombre y propietario.
     *
     * @param name    el nombre de la mascota
     * @param ownerId el ID del propietario de la mascota
     * @return true si existe una mascota con el mismo nombre y propietario, false en caso contrario
     */
    boolean existsPetByNameAndOwnerId( String name, User ownerId );

    /**
     * Encuentra todas las mascotas por su estado.
     *
     * @param status el estado de las mascotas a buscar
     * @return una lista de mascotas con el estado especificado
     */
    List< Pet > findByStatus( int status );
}