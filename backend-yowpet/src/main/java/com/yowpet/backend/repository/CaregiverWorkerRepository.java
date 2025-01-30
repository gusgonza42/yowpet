package com.yowpet.backend.repository;

import com.yowpet.backend.model.CaregiverWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverWorkerRepository extends JpaRepository< CaregiverWorker, Long> {
}
