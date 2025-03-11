package com.yowpet.backend.repository;

import com.yowpet.backend.model.AnimalCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AnimalCategoryRepo {

    @Autowired
    private JdbcTemplate template;

    private final RowMapper<AnimalCategory> animalCategRowMapper = (rs, rowNum) -> {
        AnimalCategory animalCateg = new AnimalCategory();
        animalCateg.setId(rs.getInt("id"));
        animalCateg.setName(rs.getString("name"));
        return animalCateg;
    };

    public void createAnimalCategory(String name) {
        String sql = "CALL createAnimalCategory(?)";
        template.update(sql, name);
    }

    public void updateAnimalCategory(int animalCategId, String animalCategName) {
        String sql = "CALL updateAnimalCategory(?, ?)";
        template.update(sql, animalCategId, animalCategName);
    }

    public void deleteAnimalCategory(int animalCategId) {
        String sql = "CALL deleteAnimalCategory(?)";
        template.update(sql, animalCategId);
    }

    public AnimalCategory getAnimalCategory(int animalCategId) {
        String sql = "CALL getAnimalCategory(?)";
        try {
            return template.queryForObject(sql, animalCategRowMapper, animalCategId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<AnimalCategory> getAnimalCategories() {
        String sql = "CALL getAnimalCategories()";
        return template.query(sql, animalCategRowMapper);
    }

    public List<AnimalCategory> searchAnimalCategories(String searchTerm) {
        String sql = "CALL searchAnimalCategory(?)";
        return template.query(sql, animalCategRowMapper, "%" + searchTerm + "%");
    }
}
