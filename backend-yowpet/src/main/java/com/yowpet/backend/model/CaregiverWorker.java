package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Entidad que representa a un cuidador.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CaregiverWorker {

    private int id;

    private int user;

    private String speciality;

    private int experienceYears;

    private Double hourlyRate;

    private Double rating;

    private String review;

    private String description;

    private String serviceWorker;

    private boolean statusActiveWork = true;

    private Date createdAt;

    protected void onCreate( ) {
        if ( createdAt == null ) {
            createdAt = new Date( );
        }
    }


}