package com.yowpet.backend.repository;

import com.yowpet.backend.model.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PetRepo {

    @Autowired
    private JdbcTemplate template;

    // RowMapper for Pet
    private final RowMapper<Pet> petRowMapper = (rs, rowNum) -> {
        Pet pet = new Pet();
        pet.setId(rs.getInt("id"));
        pet.setName(rs.getString("name"));
        pet.setBirthDate(rs.getDate("birth_date"));
        pet.setGender(rs.getString("gender"));
        pet.setSterilized(rs.getInt("sterilized"));
        pet.setProfilePicture(rs.getString("profile_picture"));
        pet.setOwnerId(rs.getInt("owner_id"));
        pet.setBreed(rs.getInt("breed"));
        pet.setStatus(rs.getInt("status"));
        pet.setDescription(rs.getString("description"));
        pet.setEmergencyContact(rs.getString("emergency_contact"));
        pet.setCreatedAt(rs.getTimestamp("created_at"));
        pet.setUpdatedAt(rs.getTimestamp("updated_at"));
        pet.setDeletedAt(rs.getTimestamp("deleted_at"));
        return pet;
    };

    // Create Pet
    public void createPet(Pet pet) {
        String sql = "CALL createPet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, pet.getName(), pet.getBirthDate(), pet.getGender(), pet.getSterilized(),
                pet.getProfilePicture(), pet.getOwnerId(), pet.getBreed(), pet.getStatus(),
                pet.getDescription(), pet.getEmergencyContact(), pet.getUpdatedAt());
    }

    // Update Pet
    public void updatePet(Pet pet) {
        String sql = "CALL updatePet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, pet.getId(), pet.getName(), pet.getBirthDate(), pet.getGender(), pet.getSterilized(),
                pet.getProfilePicture(), pet.getOwnerId(), pet.getBreed(), pet.getStatus(),
                pet.getDescription(), pet.getEmergencyContact(), pet.getUpdatedAt());
    }

    // Delete Pet (Soft Delete)
    public void deletePet(int petId) {
        String sql = "CALL deletePet(?)";
        template.update(sql, petId);
    }

    // Get Pet by ID
    public Pet getPet(int petId) {
        String sql = "CALL getPet(?)";
        return template.queryForObject(sql, new Object[]{petId}, petRowMapper);
    }

    // Get All Pets (Only Active)
    public List<Pet> getAllPets() {
        String sql = "CALL getAllPets()";
        return template.query(sql, petRowMapper);
    }

    // Search Pets by Name
    public List<Pet> searchPets(String searchTerm) {
        String sql = "CALL searchPets(?)";
        return template.query(sql, new Object[]{"%" + searchTerm + "%"}, petRowMapper);
    }

    // Get Pets by Status
    public List<Pet> getPetsByStatus(int status) {
        String sql = "CALL getPetsByStatus(?)";
        return template.query(sql, new Object[]{status}, petRowMapper);
    }
}
