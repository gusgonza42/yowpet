package com.yowpet.backend.model;

import lombok.*;

import java.util.Date;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Agenda {
    private int id;
    private int userid;
    private Date date;
    private String Title;


}