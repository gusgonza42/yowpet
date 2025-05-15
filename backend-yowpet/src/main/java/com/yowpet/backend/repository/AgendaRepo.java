package com.yowpet.backend.repository;

import com.yowpet.backend.model.Agenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class AgendaRepo {

    @Autowired
    private JdbcTemplate template;

    public void createAgenda(Date date, String title, int user) {
        String sql = "CALL createallergy(?, ?, ?)";
        template.update(sql, date, title, user);
    }

    public void updateAgenda(int agendaId, String title, int user) {
        String sql = "CALL updateallergy(?, ?,?)";
        template.update(sql, agendaId, title,user);
    }

    public void deleteAgenda(int agenda, Date date) {
        String sql = "CALL deleteallergy(?, ?)";
        template.update(sql, agenda, date);
    }

    public List<Agenda> getAgenda(String date, int user) {
        String sql = "CALL getnotification( ?,?)";
        try {
            return template.query(sql, new BeanPropertyRowMapper<>(Agenda.class), date,user);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public List<Agenda> getAllAgenda(int user) {
        String sql = "CALL GETALLNOTIFICATION(?)";
        try {
            return template.query(sql, new BeanPropertyRowMapper<>(Agenda.class),user);
        } catch (EmptyResultDataAccessException e) {
            throw new RuntimeException(e);

        }
    }
}
