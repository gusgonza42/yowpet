package com.yowpet.backend.model;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BreedRequestDTO {
    private Breed breed;
    private AnimalCategory animalCategory;
}
