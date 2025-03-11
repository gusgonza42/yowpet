package com.yowpet.backend.repository;

import com.yowpet.backend.model.Breed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BreedRepo {

    @Autowired
    private JdbcTemplate template;

    // RowMapper for Breed
    private final RowMapper<Breed> breedRowMapper = (rs, rowNum) -> {
        Breed breed = new Breed();
        breed.setId(rs.getInt("id"));
        breed.setName(rs.getString("name"));
        return breed;
    };

    public void createBreed(int animalCatId, String breedName) {
        String sql = "CALL createbreed(?, ?)";
        template.update(sql, animalCatId, breedName);
    }

    public void updateBreed(int breedId, String breedName, int CatID) {
        String sql = "CALL updatebreed(?, ?, ?)";
        template.update(sql, breedId, breedName, CatID);
    }

    public void deleteBreed(int breedId) {
        String sql = "CALL deletebreed(?)";
        template.update(sql, breedId);
    }

    public Breed getBreed(int breedId) {
        String sql = "CALL getbreed(?)";
        return template.queryForObject(sql, new Object[]{breedId}, breedRowMapper);
    }

    public List<Breed> getBreeds() {
        String sql = "CALL getbreeds()"; // No `?` needed if procedure takes no arguments
        return template.query(sql, breedRowMapper);
    }

    public List<Breed> getBreedsByAnimalCategory(int animalCatId) {
        String sql = "CALL getbreedsbyanimalcategory(?)";
        return template.query(sql, new Object[]{animalCatId}, breedRowMapper);
    }

    public List<Breed> searchBreeds(String searchTerm) {
        String sql = "CALL Searchbreed(?)";
        return template.query(sql, new Object[]{"%" + searchTerm + "%"}, breedRowMapper);
    }
}
