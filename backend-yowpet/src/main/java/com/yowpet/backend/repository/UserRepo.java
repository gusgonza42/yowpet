package com.yowpet.backend.repository;

import com.yowpet.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepo {

    @Autowired
    private JdbcTemplate template;


    public void createUser(String firstName, String lastName, String email, String password, String city, String address, String phoneNumber, int zipCode, String gender, String profilePicture, int role, String languages, String paymentMethod, java.util.Date birthDate) {
        String sql = "CALL createUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, firstName, lastName, email, password, city, address, phoneNumber, zipCode, gender, profilePicture, role, languages, paymentMethod, new java.sql.Date(birthDate.getTime()));
    }

    public void updateUser(int userId, String firstName, String lastName,
                           String email, String address, String phoneNumber,
                           java.util.Date birthDate, String city) {
        String sql = "CALL updateUser(?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, userId, firstName, lastName, email,
                   address, phoneNumber,
                   birthDate != null ? new java.sql.Date(birthDate.getTime()) : null,
                   city);
    }

    public void deleteUser(int userId) {
        String sql = "CALL deleteUser(?)";
        template.update(sql, userId);
    }

    public User getUser(int userId) {
        String sql = "CALL getUser(?)";
        try {
            return template.queryForObject(sql, new BeanPropertyRowMapper<>(User.class), userId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User getUserByEmail(String email) {
        String sql = "CALL getUserByEmail(?)";
        try {
            return template.queryForObject(sql, new BeanPropertyRowMapper<>(User.class), email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<User> getUsers() {
        String sql = "CALL getAllUsers()";
        return template.query(sql, new BeanPropertyRowMapper<>(User.class));
    }

    public List<User> searchUsers(String searchTerm) {
        String sql = "CALL searchUsers(?)";
        return template.query(sql, new BeanPropertyRowMapper<>(User.class), "%" + searchTerm + "%");
    }

    public void changePassword(int userId, String newPassword) {
        String sql = "CALL changePassword(?, ?)";
        template.update(sql, userId, newPassword);
    }

    public List<User> getActiveUsers() {
        String sql = "CALL getActiveUsers()";
        return template.query(sql, new BeanPropertyRowMapper<>(User.class));
    }

    public void toAdmin(int userId) {
        String sql = "CALL toAdmin(?)";
        template.update(sql, userId);
    }

    public void unadmin(int userId) {
        String sql = "CALL unadmin(?)";
        template.update(sql, userId);
    }

    public void tocargiver(int userId) {
        String sql = "CALL tocargiver(?)";
        template.update(sql, userId);
    }
    public void nocargiver(int userId) {
        String sql = "CALL nocargiver(?)";
        template.update(sql, userId);
    }
}
