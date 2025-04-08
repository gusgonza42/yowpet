package com.auth.security.repository;

import com.auth.security.model.UserJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserReposJWT {

    @Autowired
    private JdbcTemplate template;


    public UserJWT getUserByEmail(String email) {
        String sql = "CALL GetUserByEmail(?)";
        return template.queryForObject(sql, new BeanPropertyRowMapper<>(UserJWT.class), email);

    }

    public UserJWT getUserByUsername(String username) {
        String sql = "CALL GetUserByUsername(?)";
        return template.queryForObject(sql, new BeanPropertyRowMapper<>(UserJWT.class), username);

    }

    public void createUser(String firstName, String lastName, String username, String email, String password, String city, String address, String phoneNumber, int zipCode, String gender, String profilePicture, int role, String languages, String paymentMethod, java.util.Date birthDate, String token) {
        String sql = "CALL createUserandToken(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
        template.update(sql, firstName, lastName, username, email, password, city, address, phoneNumber, zipCode, gender, profilePicture, role, languages, paymentMethod, new java.sql.Date(birthDate.getTime()), token);
    }

}