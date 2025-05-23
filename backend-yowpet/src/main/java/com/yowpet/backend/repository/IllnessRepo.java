package com.yowpet.backend.repository;

import com.yowpet.backend.model.Illness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class IllnessRepo {

    @Autowired
    private JdbcTemplate template;

    // Get all pet illness relationships
    public List<Illness> getAllergies() {
        String sql = "CALL getAllPetIllnesses()";
        return template.query(sql, new BeanPropertyRowMapper<>(Illness.class));
    }

    // Get illnesses for a specific pet
    public List<Illness> getByPet(int petId) {
        String sql = "CALL getPetIllnessesByPet(?)";
        return template.query(sql, new BeanPropertyRowMapper<>(Illness.class), petId);
    }

    // Get all pets affected by a specific illness
    public List<Illness> getByIllness(int illnessId) {
        String sql = "CALL getPetIllnessesByIllness(?)";
        return template.query(sql, new BeanPropertyRowMapper<>(Illness.class), illnessId);
    }

    // Update the status of a pet-illness relationship
    public void updateStatus(int newStatus, int petId, int allergyId) {
        String sql = "CALL updatePetIllnessStatus(?, ?, ?)";
        template.update(sql, newStatus, petId, allergyId);
    }

    // Delete a pet-illness record
    public void deleteIllness(int petId, int allergyId) {
        String sql = "CALL deletePetIllness(?, ?)";
        template.update(sql, petId, allergyId);
    }

    // Create a pet-illness record
    public void create(Illness illness) {
        String sql = "CALL createPetIllness(?, ?, ?)";
        template.update(sql, illness.getPet(), illness.getAllergy(), illness.getState());
    }

    public Illness getPetIllnessOfPet(int allergyId, int petId) {
        String sql = "CALL getPetIllnessOfPet(?, ?)";
        List<Illness> result = template.query(sql, new BeanPropertyRowMapper<>(Illness.class), allergyId, petId);
        return result.isEmpty() ? null : result.get(0);
    }

}
