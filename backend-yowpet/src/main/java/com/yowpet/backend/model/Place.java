package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "places")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int l_id;

    @Column(length = 100, nullable = false)
    private String l_name;

    @Column(length = 255, nullable = false)
    private String l_address;

    @Column(length = 45, nullable = false)
    private String l_addresscode;

    public int getL_id() {
        return l_id;
    }

    public void setL_id(int l_id) {
        this.l_id = l_id;
    }

    public String getL_name() {
        return l_name;
    }

    public void setL_name(String l_name) {
        this.l_name = l_name;
    }

    public String getL_address() {
        return l_address;
    }

    public void setL_address(String l_address) {
        this.l_address = l_address;
    }

    public String getL_addresscode() {
        return l_addresscode;
    }

    public void setL_addresscode(String l_addresscode) {
        this.l_addresscode = l_addresscode;
    }

    @Override
    public String toString() {
        return "Place{" +
                "l_id=" + l_id +
                ", l_name='" + l_name + '\'' +
                ", l_address='" + l_address + '\'' +
                ", l_addresscode='" + l_addresscode + '\'' +
                '}';
    }
}