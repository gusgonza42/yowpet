package com.yowpet.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.PrePersist;
import lombok.*;

import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Pet {
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_INACTIVE = 0;

    public static final int STERILIZED_YES = 1;
    public static final int STERILIZED_NO = 0;

    private int id;
    private int animalCategory;
    private int ownerId;
    private int breed;
    private Integer status = STATUS_ACTIVE;
    private String name;
    private Date birthDate;
    private String gender;
    private String sterilized;  // "yes" or "no"
    private String profilePicture;
    private String description;
    private String emergencyContact;
    private Date createdAt;
    private Date updatedAt;
    private Date deletedAt;

    // Getter to return int version of sterilized
    @JsonProperty("sterilizedAsInt")
    public int getSterilizedAsInt() {
        if ("yes".equalsIgnoreCase(sterilized)) {
            return STERILIZED_YES;
        } else {
            return STERILIZED_NO;
        }
    }

    // Getter to return "yes" or "no"
    @JsonProperty("sterilizedText")
    public String getSterilizedText() {
        return "yes".equalsIgnoreCase(sterilized) ? "yes" : "no";
    }

    // Accept 1/0 and map to "yes"/"no"
    public void setSterilizedFromInt(int sterilizedStatus) {
        if (sterilizedStatus == STERILIZED_YES) {
            this.sterilized = "yes";
        } else if (sterilizedStatus == STERILIZED_NO) {
            this.sterilized = "no";
        } else {
            throw new IllegalArgumentException("Invalid sterilized value. Use 1 for 'yes' or 0 for 'no'.");
        }
    }

    // Accepts string values "1", "0", "yes", "no"
    public void setSterilized(String sterilized) {
        if ("1".equals(sterilized) || "yes".equalsIgnoreCase(sterilized)) {
            this.sterilized = "yes";
        } else if ("0".equals(sterilized) || "no".equalsIgnoreCase(sterilized)) {
            this.sterilized = "no";
        } else {
            throw new IllegalArgumentException("Invalid sterilized value. Use 'yes', 'no', '1' or '0'.");
        }
    }

    public int getStatus() {
        return Objects.requireNonNullElse(status, STATUS_ACTIVE);
    }

    public void setStatus(Integer status) {
        this.status = Objects.requireNonNullElse(status, STATUS_ACTIVE);
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = new Date();
        }
    }
}
