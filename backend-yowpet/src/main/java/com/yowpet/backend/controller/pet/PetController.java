package com.yowpet.backend.controller.pet;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pets")
@Tag(name = "Pets", description = "Gestión de mascotas")
public class PetController {
    @RequestMapping
    @Operation ( summary = "Get all pets", description = "Get a list of all pets" )
    public String getAllPets( ) {
        return List.of( "Dog", "Cat", "Bird" ).toString( );
    }



}