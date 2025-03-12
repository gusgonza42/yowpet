package com.yowpet.backend.model;

import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place_reviews {
    public static int status_active = 1;
    public static int status_deleted = 0;

    private int id;

    private double rating;

    private String comment;

    private int estado = status_active;

    private int place;

    private int user;

    @Override
    public String toString() {
        return "Place_reviews{" +
                "id=" + id +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", estado=" + estado +
                ", place=" + place +
                ", user=" + user +
                '}';
    }
}