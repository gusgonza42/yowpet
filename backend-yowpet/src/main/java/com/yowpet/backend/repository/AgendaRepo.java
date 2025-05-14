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

    public void createAgenda(Date date, String title) {
        String sql = "CALL createallergy(?, ?)";
        template.update(sql, date, title);
    }

    public void updateAgenda(int agendaId, String title) {
        String sql = "CALL updateallergy(?, ?)";
        template.update(sql, agendaId, title);
    }

    public void deleteAgenda(int agenda, Date date) {
        String sql = "CALL deleteallergy(?, ?)";
        template.update(sql, agenda, date);
    }

    public List<Agenda> getAgenda(String date) {
        String sql = "CALL getnotification( ?)";
        try {
            return template.query(sql, new BeanPropertyRowMapper<>(Agenda.class), date);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public List<Agenda> getAllAgenda(String call) {
        String sql = "CALL GETALLNOTIFICATION()";
        try {
            return template.query(sql, new BeanPropertyRowMapper<>(Agenda.class));
        } catch (EmptyResultDataAccessException e) {
            throw new RuntimeException(e);

        }
    }
}
