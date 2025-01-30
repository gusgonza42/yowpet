package com.yowpet.backend.controller;

import com.yowpet.backend.model.CaregiverWorker;
import com.yowpet.backend.service.CaregiverWorkerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ( "/yowpet/caregiver-worker" )
public class CaregiverWorkerController {
    private final CaregiverWorkerService caregiverWorkerService;

    public CaregiverWorkerController( CaregiverWorkerService caregiverWorkerService ) {
        this.caregiverWorkerService = caregiverWorkerService;
    }

    //TODO: endpoint de GET de obtener detalles de todos cuidadores /caregiver/
    @GetMapping ( "/all" )
    public ResponseEntity< List< CaregiverWorker > > getAllCaregivers( ) {
        return caregiverWorkerService.getAllCaregivers( );
    }

    //TODO: endpoint de GET de obtener detalles de un cuidador /caregiver/{id}
    @GetMapping ( "/{id}" )
    public ResponseEntity< CaregiverWorker > getCaregiverById( @PathVariable Long id ) {
        return caregiverWorkerService.getCaregiverById( id );
    }

    //TODO: endpoint de PUT de actualizar detalles de un cuidador /caregiver/{id}
    @PutMapping ( "/updare/{id}" )
    public ResponseEntity< CaregiverWorker > updateCaregiver( @PathVariable Long id, @RequestBody CaregiverWorker caregiverWorker ) {
        return caregiverWorkerService.updateCaregiver( id, caregiverWorker );
    }

    //TODO: endpoint de DELETE logico para dar de baja/desactivar un perfil de cuidador /user/

    //TODO: endpoint de GET listar trabajos de cuidador disponibles /caregiver/available


    //TODO: endpoint de GET para listar cuidadores disponibles por ciudad /caregiver/available/city/{city}

    /// TODO: endpoint de GET para listar cuidadores disponibles por especialidad /caregiver/available/specialty/{specialty}


    //TODO: endpoint de POST de calificar a un cuidador /caregiver/{id}/rate
    @PostMapping ( "/rate/{id}" )
    public ResponseEntity< CaregiverWorker > rateCaregiver( @PathVariable Long id, @RequestBody CaregiverWorker caregiverWorker ) {
        return caregiverWorkerService.rateCaregiver( id, caregiverWorker );
    }


    @GetMapping ( "/availables" )
    public ResponseEntity< List< CaregiverWorker > > getAvailableCaregivers( ) {
        return caregiverWorkerService.getAvailableCaregivers( );
    }


}
