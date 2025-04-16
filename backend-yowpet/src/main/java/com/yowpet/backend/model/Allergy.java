package com.yowpet.backend.model;

import lombok.*;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Allergy {

    private int id;

    private String name;

    private byte[] photo;

}