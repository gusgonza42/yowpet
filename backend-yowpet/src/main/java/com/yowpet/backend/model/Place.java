package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "places")
public class Place {
    public static int status_active = 1;
    public static int status_deleted = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 255, nullable = false)
    private String address;

    @Column(length = 45, nullable = false)
    private String addresscode;

    @Column(length = 45, nullable = false)
    private int estado = status_active;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Place_reviews> reviews;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddresscode() {
        return addresscode;
    }

    public void setAddresscode(String addresscode) {
        this.addresscode = addresscode;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public List<Place_reviews> getReviews() {
        return reviews;
    }

    public void setReviews(List<Place_reviews> reviews) {
        this.reviews = reviews;
    }

    @Override
    public String toString() {
        return "Place{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", addresscode='" + addresscode + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
