package com.auth.security.dto;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthRegisterResponseDTO {

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String token;
    private int role;
    private int status;
    private Date createdAt;

    public AuthRegisterResponseDTO(String token) {
        this.token = token;
    }
}
