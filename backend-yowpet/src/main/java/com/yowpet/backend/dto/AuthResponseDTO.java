package com.yowpet.backend.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String token;
    private String type = "Bearer";
    private String message;
    private boolean success;
}