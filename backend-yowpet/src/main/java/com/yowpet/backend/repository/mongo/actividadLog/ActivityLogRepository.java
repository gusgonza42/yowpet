package com.yowpet.backend.repository.mongo.actividadLog;

import com.yowpet.backend.model.mongo.activityLog.ActivityLogModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepository extends MongoRepository< ActivityLogModel, String> {

}