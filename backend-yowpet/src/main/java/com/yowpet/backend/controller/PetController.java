package com.yowpet.backend.controller;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.service.PetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ( "/yowpet/pet" )
public class PetController {

    private final PetService petService;

    public PetController( PetService petService ) {
        this.petService = petService;
    }

    @PostMapping ( "/create" )
    public ResponseEntity< String > createPet( @RequestBody Pet pet ) {
        return petService.createPet( pet );
    }


    @GetMapping ( "/all" )
    public ResponseEntity< List< Pet > > getAllUsers( ) {
        return petService.getAllPets( );
    }

    @GetMapping ( "/{id}" )
    public ResponseEntity< Pet > getPetById( @PathVariable Long id ) {
        return petService.getPetById( id );
    }

    @PutMapping ( "/update/{id}" )
    public ResponseEntity< Pet > updatePet( @PathVariable Long id, @RequestBody Pet pet ) {
        return petService.updatePet( id, pet );
    }

    @DeleteMapping ( "/delete/{id}" )
    public ResponseEntity< String > deletePet( @PathVariable Long id ) {
        return petService.deletePet( id );
    }
}
