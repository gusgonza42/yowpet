package com.yowpet.backend.service;


import com.yowpet.backend.model.Agenda;
import com.yowpet.backend.repository.AgendaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepo repo;

    public List<Agenda> getbyID(String date) {
        return repo.getAgenda( date);
    }


    public void create(Agenda agenda) {

        repo.createAgenda(agenda.getDate(), agenda.getTitle());
    }

    public void update(int id, Agenda agenda) {
        agenda.setId(id);

        System.out.println("Agenda ID: " + agenda.getId());

        repo.updateAgenda(agenda.getId(), agenda.getTitle());
    }

    public void delete(int id, Date date) {
        repo.deleteAgenda(id, date);
    }

}