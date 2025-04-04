package com.yowpet.backend.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {
    // Constants for status
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_INACTIVE = 2;

    // Constants for roles
    public static final int ROLE_ADMIN = 0;
    public static final int ROLE_CAREGIVER = 1;
    public static final int ROLE_USER = 2;

    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String city;
    private String address;
    private String phoneNumber;
    private int zipCode;
    private String gender;
    private String profilePicture;
    private String languages;
    private String paymentMethod;

    private int status;  // Store status as an integer (1 = active, 2 = inactive)
    private int role;    // Store role as an integer (0 = admin, 1 = caregiver, 2 = user)

    private Date birthDate;
    private Date createdAt;
    private Date updatedAt;
    private Date deletedAt;

    // Getter for 'status' (as String)
    public String getStatusString() {
        return (this.status == STATUS_ACTIVE) ? "active" : "inactive";
    }

    // Setter for 'status' (from String)
    public void setStatusFromString(String statusString) {
        if ("active".equalsIgnoreCase(statusString)) {
            this.status = STATUS_ACTIVE;
        } else if ("inactive".equalsIgnoreCase(statusString)) {
            this.status = STATUS_INACTIVE;
        } else {
            throw new IllegalArgumentException("Invalid status value: " + statusString);
        }
    }

    // Getter for 'role' (as String)
    public String getRoleString() {
        switch (this.role) {
            case ROLE_ADMIN:
                return "admin";
            case ROLE_CAREGIVER:
                return "caregiver";
            case ROLE_USER:
                return "user";
            default:
                return "unknown";
        }
    }

    // Setter for 'role' (from String)
    public void setRoleFromString(String roleString) {
        switch (roleString.toLowerCase()) {
            case "admin":
                this.role = ROLE_ADMIN;
                break;
            case "caregiver":
                this.role = ROLE_CAREGIVER;
                break;
            case "user":
                this.role = ROLE_USER;
                break;
            default:
                throw new IllegalArgumentException("Invalid role value: " + roleString);
        }
    }

    public String getLanguages() {
        if (languages == null || languages.isEmpty()) {
            return "English(no set)";
        } else {
            return languages;
        }

    }

    public void setLanguages(String languages) {
        if (languages == null || languages.isEmpty()) {
            this.languages = "English(no set)";
        } else {
            this.languages = languages;
        }
    }

    // Constructor for creating a new User
    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.status = STATUS_ACTIVE;  // Default status
        this.role = ROLE_USER;        // Default role
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
