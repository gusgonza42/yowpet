package com.yowpet.backend.model.mongo.activityLog;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data

@Document ( collection = "activity_log" )
public class ActivityLogModel {
    @Id
    private String logId;
    private String userId;
    private String action;
    private LocalDateTime date;

    public String getLogId( ) {
        return logId;
    }

    public void setLogId( String logId ) {
        this.logId = logId;
    }

    public String getUserId( ) {
        return userId;
    }

    public void setUserId( String userId ) {
        this.userId = userId;
    }

    public String getAction( ) {
        return action;
    }

    public void setAction( String action ) {
        this.action = action;
    }

    public LocalDateTime getDate( ) {
        return date;
    }

    public void setDate( LocalDateTime date ) {
        this.date = date;
    }
}