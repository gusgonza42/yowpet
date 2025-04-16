package com.yowpet.backend.repository;

import com.yowpet.backend.model.Reservation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ReservationRepo {
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Reservation> ReservationRowMapper = (rs, rowNum) -> {
        Reservation reservation = new Reservation();
        reservation.setId(rs.getInt("id"));
        reservation.setUser(rs.getInt("user"));
        reservation.setCareGiver(rs.getInt("care_giver"));
        reservation.setDetails(rs.getString("details"));
        reservation.setReservationDate(rs.getDate("reservation_date"));
        return reservation;
    };

    public ReservationRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createReservation(Reservation reservation) {
        String sql = "CALL createReservation(?, ?, ?, ?)";
        jdbcTemplate.update(sql, reservation.getUser(), reservation.getCareGiver(), reservation.getDetails(), reservation.getReservationDate());
    }

    public void updateReservation(Reservation reservation) {
        String sql = "CALL updateReservation(?, ?, ?)";
        jdbcTemplate.update(sql, reservation.getId(), reservation.getDetails(), reservation.getReservationDate());
    }

    public void deleteReservation(int id) {
        String sql = "CALL deleteReservation(?)";
        jdbcTemplate.update(sql, id);
    }

    public Reservation getReservationById(int id) {
        String sql = "CALL getReservation(?)";
        return jdbcTemplate.queryForObject(sql,  ReservationRowMapper, id);
    }

    public List<Reservation> getAllReservations() {
        String sql = "CALL getAllReservations()";
        return jdbcTemplate.query(sql, ReservationRowMapper);
    }

    public List<Reservation> getReservationsByUser(int userId) {
        String sql = "CALL getReservationsByUser(?)";
        return jdbcTemplate.query(sql, ReservationRowMapper, userId);
    }

    public List<Reservation> getReservationsByCareGiver(int careGiverId) {
        String sql = "CALL getReservationsByCareGiver(?)";
        return jdbcTemplate.query(sql, ReservationRowMapper, careGiverId);
    }

    public void completeReservation(int id) {
        String sql = "CALL completeReservation(?)";
        jdbcTemplate.update(sql, id);
    }

    public List<Reservation> getReservationsByStatus(int status) {
        String sql = "CALL getReservationsByStatus(?)";
        return jdbcTemplate.query(sql, ReservationRowMapper, status);
    }
}
