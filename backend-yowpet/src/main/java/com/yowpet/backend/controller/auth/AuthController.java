package com.yowpet.backend.controller.auth;

import com.yowpet.backend.dto.LoginRequestDTO;
import com.yowpet.backend.dto.RegisterRequestDTO;
import com.yowpet.backend.dto.RegisterResponseDTO;
import com.yowpet.backend.service.auth.AuthService;
import com.yowpet.backend.utils.constants.YowPetConstants;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "/yowpet/auth" )
public class AuthController {

    private final AuthService authService;

    public AuthController( AuthService authService ) {
        this.authService = authService;
    }

    @GetMapping( "/hello" )
    public ResponseEntity< String > getHello( ) {
        return ResponseEntity.status( HttpStatus.OK ).body( YowPetConstants.HELLO_FROM_YOWPET_PROJECT );
    }

    @PostMapping( "/login" )
    public ResponseEntity< ? > login( @Valid @RequestBody LoginRequestDTO loginRequestDTO ) {
        return authService.login( loginRequestDTO );
    }

    @PostMapping( "/register" )
    public ResponseEntity< ? > register( @Valid @RequestBody RegisterRequestDTO registerRequestDTO ) {
        return authService.register( registerRequestDTO );
    }

}
