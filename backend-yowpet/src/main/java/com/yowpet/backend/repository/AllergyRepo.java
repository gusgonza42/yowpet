package com.yowpet.backend.repository;

import com.yowpet.backend.model.Allergy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AllergyRepo {

    @Autowired
    private JdbcTemplate template;

    private final RowMapper<Allergy> allergyRowMapper = (rs, rowNum) -> {
        Allergy allergy = new Allergy();
        allergy.setId(rs.getInt("id"));
        allergy.setName(rs.getString("name"));
        allergy.setPhoto(rs.getBytes("photo"));
        return allergy;
    };

    public void createAllergy(int id, String name) {
        String sql = "CALL createallergy(?, ?)";
        template.update(sql, id, name);
    }

    public void updateAllergy(int allergyId, String allergyName) {
        String sql = "CALL updateallergy(?, ?, ?)";
        template.update(sql, allergyId, allergyName);
    }

    public void deleteAllergy(int allergyId) {
        String sql = "CALL deleteallergy(?)";
        template.update(sql, allergyId);
    }

    public Allergy getAllergy(int allergyId) {
        String sql = "CALL getallergy(?)";
        try {
            return template.queryForObject(sql, allergyRowMapper, allergyId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Allergy> getAllergies() {
        String sql = "CALL getallergys()";
        return template.query(sql, allergyRowMapper);
    }

    public List<Allergy> searchAllergies(String searchTerm) {
        String sql = "CALL Searchallergy(?)";
        return template.query(sql, allergyRowMapper, "%" + searchTerm + "%");
    }
}
