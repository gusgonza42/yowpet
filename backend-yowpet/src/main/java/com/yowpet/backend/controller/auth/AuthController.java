package com.yowpet.backend.controller.auth;

import com.yowpet.backend.dto.AuthRequestDTO;
import com.yowpet.backend.service.auth.AuthService;
import com.yowpet.backend.utils.constants.Constants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/yowpet")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/hello")
    public ResponseEntity<?> helloYowpet() {
        return ResponseEntity.ok(Constants.HELLO_PROYECT);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequestDTO request) {
        return authService.register(request);
    }
}
