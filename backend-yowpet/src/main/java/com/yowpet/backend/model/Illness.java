package com.yowpet.backend.model;

import lombok.*;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Illness {

    public static int status_affected = 1;
    public static int status_Healed = 2;


    private int pet;

    private int allergy;

    private int state = status_affected;

}