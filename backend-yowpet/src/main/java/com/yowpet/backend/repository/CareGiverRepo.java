package com.yowpet.backend.repository;

import com.yowpet.backend.model.CaregiverWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CareGiverRepo {

    @Autowired
    private JdbcTemplate template;

    // RowMapper for CaregiverWorker
    private final RowMapper<CaregiverWorker> CareGiverRowMapper = (rs, rowNum) -> {
        CaregiverWorker caregiver = new CaregiverWorker();
        caregiver.setId(rs.getInt("id"));
        caregiver.setUser(rs.getInt("user_id"));
        caregiver.setSpeciality(rs.getString("speciality"));
        caregiver.setExperienceYears(rs.getInt("experience_years"));
        caregiver.setHourlyRate(rs.getDouble("hourly_rate"));
        caregiver.setRating(rs.getDouble("rating"));
        caregiver.setReview(rs.getString("review"));
        caregiver.setDescription(rs.getString("description"));
        caregiver.setServiceWorker(rs.getString("service_worker"));
        caregiver.setStatusActiveWork(rs.getBoolean("status_active_work"));
        return caregiver;
    };

    public void createCaregiverWorker(CaregiverWorker caregiver) {
        String sql = "CALL createCaregiverWorker(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, caregiver.getUser(), caregiver.getSpeciality(), caregiver.getExperienceYears(),
                caregiver.getHourlyRate(), caregiver.getRating(), caregiver.getReview(), caregiver.getDescription(),
                caregiver.getServiceWorker());
    }

    public void updateCaregiverWorker(CaregiverWorker caregiver) {
        String sql = "CALL updateCaregiverWorker(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        template.update(sql, caregiver.getId(), caregiver.getUser(), caregiver.getSpeciality(),
                caregiver.getExperienceYears(), caregiver.getHourlyRate(), caregiver.getRating(),
                caregiver.getReview(), caregiver.getDescription(), caregiver.getServiceWorker());
    }

    public void deleteCaregiverWorker(int caregiverId) {
        String sql = "CALL deleteCaregiverWorker(?)";
        template.update(sql, caregiverId);
    }

    public CaregiverWorker getCaregiverWorker(int caregiverId) {
        String sql = "CALL getCaregiverWorker(?)";
        return template.queryForObject(sql, new Object[]{caregiverId}, CareGiverRowMapper);
    }

    public List<CaregiverWorker> getAllCaregiverWorkers() {
        String sql = "CALL getAllCaregiverWorkers()";
        return template.query(sql, CareGiverRowMapper);
    }

    public List<CaregiverWorker> getCaregiverWorkersByCategory(int animalCatId) {
        String sql = "CALL getCaregiverWorkersByCategory(?)";
        return template.query(sql, new Object[]{animalCatId}, CareGiverRowMapper);
    }

    public List<CaregiverWorker> searchCaregiverWorkers(String searchTerm) {
        String sql = "CALL searchCaregiverWorkers(?)";
        return template.query(sql, new Object[]{"%" + searchTerm + "%"}, CareGiverRowMapper);
    }

    public CaregiverWorker getCaregiverWorkersByUser(int userId) {
        String sql = "CALL getCaregiverWorkersByUser(?)";
        return template.queryForObject(sql, new Object[]{userId}, CareGiverRowMapper);
    }

    public  List<CaregiverWorker> getCaregiverWorkersBySpeciality(String speciality) {
        String sql = "CALL getCaregiverWorkersBySpeciality(?)";
        return template.query(sql, new Object[]{speciality}, CareGiverRowMapper);
    }

    public List<CaregiverWorker> getCaregiverWorkersByRating(double rating) {
        String sql = "CALL getCaregiverWorkersByRating(?)";
        return template.query(sql, new Object[]{rating}, CareGiverRowMapper);
    }
}
