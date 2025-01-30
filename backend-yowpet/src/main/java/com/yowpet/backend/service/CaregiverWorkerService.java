package com.yowpet.backend.service;

import com.yowpet.backend.model.CaregiverWorker;
import com.yowpet.backend.repository.CaregiverWorkerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaregiverWorkerService {
    private final CaregiverWorkerRepository caregiverWorkerRepository;

    public CaregiverWorkerService( CaregiverWorkerRepository caregiverWorkerRepository ) {
        this.caregiverWorkerRepository = caregiverWorkerRepository;
    }

    //GET all caregivers
    public ResponseEntity< List< CaregiverWorker > > getAllCaregivers( ) {
        try {
            List< CaregiverWorker > caregiverWorkers = caregiverWorkerRepository.findAll( );
            if( caregiverWorkers.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            return ResponseEntity.ok( caregiverWorkers );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }


    //GET caregiver by id
    public ResponseEntity< CaregiverWorker > getCaregiverById( Long id ) {
        try {
            Optional< CaregiverWorker > caregiverWorker = caregiverWorkerRepository.findById( id );
            return caregiverWorker.map( ResponseEntity :: ok ).orElseGet( ( ) -> ResponseEntity.status( HttpStatus.NOT_FOUND ).build( ) );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    //UPDATE caregiver
    public ResponseEntity< CaregiverWorker > updateCaregiver( Long id, CaregiverWorker updatedCaregiver ) {
        try {
            Optional< CaregiverWorker > existingCaregiver = caregiverWorkerRepository.findById( id );
            if( existingCaregiver.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            CaregiverWorker caregiverToSave = existingCaregiver.get( );
            caregiverToSave.setSpecialty( updatedCaregiver.getSpecialty( ) );
            caregiverToSave.setExperienceYears( updatedCaregiver.getExperienceYears( ) );
            caregiverToSave.setHourlyRate( updatedCaregiver.getHourlyRate( ) );
            caregiverToSave.setRating( updatedCaregiver.getRating( ) );
            caregiverToSave.setReview( updatedCaregiver.getReview( ) );
            caregiverToSave.setDescription( updatedCaregiver.getDescription( ) );
            caregiverToSave.setServiceWorker( updatedCaregiver.getServiceWorker( ) );
            caregiverToSave.setStatus( updatedCaregiver.getStatus( ) );
            CaregiverWorker savedCaregiver = caregiverWorkerRepository.save( caregiverToSave );
            return ResponseEntity.ok( savedCaregiver );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }


    //GET available caregivers
    public ResponseEntity< List< CaregiverWorker > > getAvailableCaregivers( ) {
        try {
            List< CaregiverWorker > caregiverWorkers = caregiverWorkerRepository.findAllByStatus_active_workIsTrue( );
            if( caregiverWorkers.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            return ResponseEntity.ok( caregiverWorkers );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    public ResponseEntity< CaregiverWorker > rateCaregiver( Long id, CaregiverWorker caregiverWorker ) {
        try {
            Optional< CaregiverWorker > existingCaregiver = caregiverWorkerRepository.findById( id );
            if( existingCaregiver.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            CaregiverWorker caregiverToRate = existingCaregiver.get( );
            caregiverToRate.setRating( caregiverWorker.getRating( ) );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }
}
