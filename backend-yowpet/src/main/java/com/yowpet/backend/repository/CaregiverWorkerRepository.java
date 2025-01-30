package com.yowpet.backend.repository;

import com.yowpet.backend.model.CaregiverWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaregiverWorkerRepository extends JpaRepository< CaregiverWorker, Long> {

    List< CaregiverWorker> findAllByStatus_active_workIsTrue( );
}
