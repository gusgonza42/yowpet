package com.yowpet.backend.repository;

import com.yowpet.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class UserRepo {

    @Autowired
    private JdbcTemplate template;

    // RowMapper for User
    private final RowMapper<User> userRowMapper = (rs, rowNum) -> {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setCity(rs.getString("city"));
        user.setAddress(rs.getString("address"));
        user.setPhoneNumber(rs.getInt("phone_number"));
        user.setZipCode(rs.getInt("zip_code"));
        user.setGender(rs.getString("gender"));
        user.setProfilePicture(rs.getString("profile_picture"));
        user.setRole(rs.getInt("role"));
        user.setStatus(rs.getInt("status"));
        user.setBirthDate(rs.getDate("birth_date"));
        user.setLanguages(rs.getString("languages"));
        user.setPaymentMethod(rs.getString("payment_method"));
        user.setCreatedAt(rs.getTimestamp("created_at"));
        user.setUpdatedAt(rs.getTimestamp("updated_at"));
        user.setDeletedAt(rs.getTimestamp("deleted_at"));
        return user;
    };

    public void createUser(String firstName, String lastName, String email, String password, String city, String address, int phoneNumber, int zipCode, String gender, String profilePicture, int role, String languages, String paymentMethod, java.util.Date birthDate) {
        String sql = "CALL createUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, firstName, lastName, email, password, city, address, phoneNumber, zipCode, gender, profilePicture, role, languages, paymentMethod, new java.sql.Date(birthDate.getTime()));
    }

    public void updateUser(int userId, String firstName, String lastName, String email, String city, String address, int phoneNumber, int zipCode, String gender, String profilePicture, int role, String languages, String paymentMethod, java.util.Date birthDate) {
        String sql = "CALL updateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, userId, firstName, lastName, email, city, address, phoneNumber, zipCode, gender, profilePicture, role, languages, paymentMethod, new java.sql.Date(birthDate.getTime()));
    }

    public void deleteUser(int userId) {
        String sql = "CALL deleteUser(?)";
        template.update(sql, userId);
    }

    public User getUser(int userId) {
        String sql = "CALL getUser(?)";
        try {
            return template.queryForObject(sql, userRowMapper, userId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User getUserByEmail(String email) {
        String sql = "CALL getUserByEmail(?)";
        try {
            return template.queryForObject(sql, userRowMapper, email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<User> getUsers() {
        String sql = "CALL getUsers()";
        return template.query(sql, userRowMapper);
    }

    public List<User> searchUsers(String searchTerm) {
        String sql = "CALL searchUser(?)";
        return template.query(sql, userRowMapper, "%" + searchTerm + "%");
    }

    public void changePassword(int userId, String newPassword) {
        String sql = "CALL changePassword(?, ?)";
        template.update(sql, userId, newPassword);
    }

    public List<User> getActiveUsers(int state) {
        String sql = "CALL getActiveUsers(?)";
        return template.query(sql, userRowMapper, state);
    }

    public void toAdmin(int userId) {
        String sql = "CALL toAdmin(?)";
        template.update(sql, userId);
    }

    public void unadmin(int userId) {
        String sql = "CALL unadmin(?)";
        template.update(sql, userId);
    }

}
