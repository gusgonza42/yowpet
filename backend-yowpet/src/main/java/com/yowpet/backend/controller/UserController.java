package com.yowpet.backend.controller;

import com.yowpet.backend.model.User;
import com.yowpet.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ( "/yowpet/user" )
public class UserController {

    private final UserService userService;

    public UserController( UserService userService ) {
        this.userService = userService;
    }

    @PostMapping ( "/create" )
    public ResponseEntity< String > createUser( @RequestBody User user ) {
        return userService.createUser( user );
    }


    @GetMapping ( "/all" )
    public ResponseEntity< List< User > > getAllUsers( ) {
        return userService.getAllUsers( );
    }

    @GetMapping ( "/{id}" )
    public ResponseEntity< User > getUserById( @PathVariable Long id ) {
        return userService.getUserById( id );
    }

    @PutMapping ( "/update/{id}" )
    public ResponseEntity< User > updateUser( @PathVariable Long id, @RequestBody User user ) {
        return userService.updateUser( id, user );
    }

    @DeleteMapping ( "/delete/{id}" )
    public ResponseEntity< String > deleteUser( @PathVariable Long id ) {
        return userService.deleteUser( id );
    }


}
