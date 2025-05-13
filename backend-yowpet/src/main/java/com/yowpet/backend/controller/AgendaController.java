package com.yowpet.backend.controller;

import com.yowpet.backend.model.Agenda;
import com.yowpet.backend.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/yowpet/agenda")
public class AgendaController {

    @Autowired
    private AgendaService service;

    @GetMapping
    public ResponseEntity<List<Agenda>> getAgendaByDate(@RequestParam String date) throws ParseException {
        // Optional: Parse the string to a Date
        Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);

        List<Agenda> agendas = service.getbyID(date);
        return ResponseEntity.ok(agendas);
    }

    @PostMapping("/create")
    public void create(@RequestBody Agenda agenda) {
        service.create(agenda);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable int id, @RequestBody Agenda agenda) {
        service.update(id, agenda);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id, @RequestBody Date date) {
        service.delete(id, date);
    }
}