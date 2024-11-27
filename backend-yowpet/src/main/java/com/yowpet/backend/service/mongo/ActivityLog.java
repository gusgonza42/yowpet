package com.yowpet.backend.service.mongo;

import com.yowpet.backend.model.mongo.activityLog.ActivityLogModel;
import com.yowpet.backend.repository.mongo.actividadLog.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityLog {
    @Autowired
    private ActivityLogRepository activityLogRepository;

    // Crear un log de actividad
    public ActivityLogModel createLog( String userId, String action, String details) {
        ActivityLogModel log = new ActivityLogModel();
        log.setUserId(userId);
        log.setAction(action);
        log.setDate( LocalDateTime.now());
        return activityLogRepository.save(log);
    }

    // Obtener todos los logs
    public List<ActivityLogModel> getAllLogs() {
        return activityLogRepository.findAll();
    }

}