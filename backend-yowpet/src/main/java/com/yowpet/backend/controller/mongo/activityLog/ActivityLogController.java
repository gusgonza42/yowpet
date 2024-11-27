package com.yowpet.backend.controller.mongo.activityLog;

import com.yowpet.backend.model.mongo.activityLog.ActivityLogModel;
import com.yowpet.backend.service.mongo.ActivityLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity-logs")
public class ActivityLogController {

    @Autowired
    private ActivityLog activityLogService;

    @PostMapping
    public ActivityLogModel createLog(@RequestParam String userId,
                                      @RequestParam String action,
                                      @RequestParam(required = false) String details) {
        return activityLogService.createLog(userId, action, details);
    }

    @GetMapping
    public List<ActivityLogModel> getAllLogs() {
        return activityLogService.getAllLogs();
    }
}