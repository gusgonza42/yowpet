package com.yowpet.backend.repository;

import com.yowpet.backend.model.Pet;
import com.yowpet.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PetRepo {

    @Autowired
    private JdbcTemplate template;

    // Create Pet
    public void createPet(Pet pet) {
        String sql = "CALL createPet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql,
                pet.getName(),
                pet.getBirthDate(),
                pet.getGender(),
                pet.getSterilized(),
                pet.getProfilePicture(),
                pet.getOwnerId(),
                pet.getAnimalCategory(),
                pet.getBreed(),
                pet.getStatus(),
                pet.getDescription(),
                pet.getEmergencyContact());
    }


    // Update Pet
    public void updatePet(Pet pet) {
        String sql = "CALL updatePet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql,
                pet.getId(),                // Passing the 'id' as the first parameter
                pet.getName(),
                pet.getBirthDate(),
                pet.getGender(),
                pet.getSterilizedAsInt(),   // Use getSterilizedAsInt() for integer value (1/0)
                pet.getProfilePicture(),
                pet.getOwnerId(),
                pet.getAnimalCategory(),
                pet.getBreed(),
                pet.getStatus(),
                pet.getDescription(),
                pet.getEmergencyContact());
    }


    // Delete Pet (Soft Delete)
    public void deletePet(int petId) {
        String sql = "CALL deletePet(?)";
        template.update(sql, petId);
    }

    // Get Pet by ID
    public Pet getPet(int petId) {
        String sql = "CALL getPet(?)";
        return template.queryForObject(sql, new BeanPropertyRowMapper<>(Pet.class), new Object[]{petId});
    }

    // Get All Pets (Only Active)
    public List<Pet> getAllPets() {
        String sql = "CALL getAllPets()";
        return template.query(sql, new BeanPropertyRowMapper<>(Pet.class));
    }

    // Search Pets by Name
    public List<Pet> searchPets(String searchTerm) {
        String sql = "CALL searchPets(?)";
        return template.query(sql, new Object[]{"%" + searchTerm + "%"}, new BeanPropertyRowMapper<>(Pet.class));
    }

    // Get Pets by Status
    public List<Pet> getPetsByStatus(int status) {
        String sql = "CALL getPetsByStatus(?)";
        return template.query(sql, new Object[]{status}, new BeanPropertyRowMapper<>(Pet.class));
    }

    public List<Pet> getPetsByUserId(int userid) {
        String sql = "CALL getPetsByOwner(?)";
        return template.query(sql, new Object[]{userid}, new BeanPropertyRowMapper<>(Pet.class));
    }
}
