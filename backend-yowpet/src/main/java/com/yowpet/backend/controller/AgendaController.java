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
        System.out.println(agendas);
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

    @GetMapping("/all")
    public ResponseEntity<List<Agenda>> getAllAgendas() {
        try {
            System.out.println("Fetching agendas...");

            List<Agenda> agendas = service.getAll();
            System.out.println("Fetched agendas: " + agendas);

            return ResponseEntity.ok(agendas);
        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

}