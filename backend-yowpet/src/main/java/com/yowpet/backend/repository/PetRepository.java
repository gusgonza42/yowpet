package com.yowpet.backend.repository;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository< Pet, Long > {

    boolean existsPetByNameAndOwnerId( String name, User ownerId );

    List< Pet > findByStatus( int status );
}
