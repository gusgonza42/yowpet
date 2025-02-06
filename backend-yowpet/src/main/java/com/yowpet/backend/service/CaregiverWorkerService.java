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
            if ( caregiverWorkers.isEmpty( ) ) {
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
            return caregiverWorker.map( ResponseEntity::ok ).orElseGet( ( ) -> ResponseEntity.status( HttpStatus.NOT_FOUND ).build( ) );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    //UPDATE caregiver
    public ResponseEntity< CaregiverWorker > updateCaregiver( Long id , CaregiverWorker updatedCaregiver ) {
        try {
            Optional< CaregiverWorker > existingCaregiverOpt = caregiverWorkerRepository.findById( id );
            if ( existingCaregiverOpt.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }

            CaregiverWorker existingCaregiver = existingCaregiverOpt.get( );
            updateCaregiverDetails( existingCaregiver , updatedCaregiver );
            CaregiverWorker savedCaregiver = caregiverWorkerRepository.save( existingCaregiver );

            return ResponseEntity.ok( savedCaregiver );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    private void updateCaregiverDetails( CaregiverWorker existingCaregiver , CaregiverWorker updatedCaregiver ) {
        existingCaregiver.setSpecialty( updatedCaregiver.getSpecialty( ) );
        existingCaregiver.setExperienceYears( updatedCaregiver.getExperienceYears( ) );
        existingCaregiver.setHourlyRate( updatedCaregiver.getHourlyRate( ) );
        existingCaregiver.setRating( updatedCaregiver.getRating( ) );
        existingCaregiver.setReview( updatedCaregiver.getReview( ) );
        existingCaregiver.setDescription( updatedCaregiver.getDescription( ) );
        existingCaregiver.setServiceWorker( updatedCaregiver.getServiceWorker( ) );
        existingCaregiver.setStatus( updatedCaregiver.getStatus( ) );
    }


    //GET available caregivers
    public ResponseEntity< List< CaregiverWorker > > getAvailableCaregivers( ) {
        try {
            List< CaregiverWorker > caregiverWorkers = caregiverWorkerRepository.findAllByStatus_active_workIsTrue( );
            if ( caregiverWorkers.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            return ResponseEntity.ok( caregiverWorkers );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
    }

    public ResponseEntity< CaregiverWorker > rateCaregiver( Long id , CaregiverWorker caregiverWorker ) {
        try {
            Optional< CaregiverWorker > existingCaregiver = caregiverWorkerRepository.findById( id );
            if ( existingCaregiver.isEmpty( ) ) {
                return ResponseEntity.status( HttpStatus.NOT_FOUND ).build( );
            }
            CaregiverWorker caregiverToRate = existingCaregiver.get( );
            caregiverToRate.setRating( caregiverWorker.getRating( ) );
        } catch ( Exception e ) {
            return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
        }
        return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).build( );
    }
}