package com.yowpet.backend.service;

import com.yowpet.backend.model.CaregiverWorker;
import com.yowpet.backend.model.User;
import com.yowpet.backend.repository.CareGiverRepo;
import com.yowpet.backend.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Servicio para gestionar los cuidadores.
 */
@Service
public class CaregiverWorkerService {

    private static final Logger logger = LoggerFactory.getLogger(CaregiverWorkerService.class);

    private final CareGiverRepo caregiverWorkerRepository;
    private final UserRepo userRepository;

    /**
     * Constructor del CaregiverWorkerService.
     *
     * @param caregiverWorkerRepository el repositorio de trabajadores cuidadores
     * @param userRepository            el repositorio de usuarios
     */
    public CaregiverWorkerService(CareGiverRepo caregiverWorkerRepository, UserRepo userRepository) {
        this.caregiverWorkerRepository = caregiverWorkerRepository;
        this.userRepository = userRepository;
    }

    /**
     * Activa un cuidador.
     *
     * @param id el ID del cuidador a activar
     * @return la entidad de respuesta con el usuario activado
     */
    public ResponseEntity<User> activateCaregiver(int id) {
        try {
            Optional<User> userOpt = Optional.ofNullable(userRepository.getUser(id));
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            User user = userOpt.get();
            user.setRole(User.ROLE_CAREGIVER);
//            userRepository.updateUser(
//                    user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getCity(),
//                    user.getAddress(), user.getPhoneNumber()
//            );
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Error activating caregiver with ID {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Crea un nuevo cuidador.
     */
    public ResponseEntity<CaregiverWorker> createCaregiver(CaregiverWorker caregiverWorker) {
        try {
            Optional<User> userOpt = Optional.ofNullable(userRepository.getUser(caregiverWorker.getUser()));
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            User user = userOpt.get();
            user.setUpdatedAt(new Date());
            user.setRole(User.ROLE_CAREGIVER);

            caregiverWorker.setUser(user.getId());
            caregiverWorkerRepository.createCaregiverWorker(caregiverWorker);

            return ResponseEntity.ok(caregiverWorker);
        } catch (Exception e) {
            logger.error("Error creating caregiver: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Recupera todos los cuidadores.
     */
    public ResponseEntity<List<CaregiverWorker>> getAllCaregivers() {
        try {
            List<CaregiverWorker> caregivers = caregiverWorkerRepository.getAllCaregiverWorkers();
            if (caregivers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(caregivers);
        } catch (Exception e) {
            logger.error("Error fetching all caregivers: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Recupera un cuidador por ID.
     */
    public ResponseEntity<CaregiverWorker> getCaregiverById(int id) {
        try {
            Optional<CaregiverWorker> caregiverWorker = Optional.ofNullable(caregiverWorkerRepository.getCaregiverWorker(id));
            if (caregiverWorker.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(caregiverWorker.get());
        } catch (Exception e) {
            logger.error("Error fetching caregiver by ID {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Actualiza los detalles de un cuidador.
     */
    public ResponseEntity<CaregiverWorker> updateCaregiver(int id, CaregiverWorker updatedCaregiver) {
        try {
            Optional<CaregiverWorker> existingCaregiver = Optional.ofNullable(caregiverWorkerRepository.getCaregiverWorker(id));
            if (existingCaregiver.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            updateCaregiverDetails(existingCaregiver.get(), updatedCaregiver);
            caregiverWorkerRepository.updateCaregiverWorker(existingCaregiver.get());

            return ResponseEntity.ok(existingCaregiver.get());
        } catch (Exception e) {
            logger.error("Error updating caregiver with ID {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private void updateCaregiverDetails(CaregiverWorker existing, CaregiverWorker updated) {
        existing.setSpeciality(updated.getSpeciality());
        existing.setExperienceYears(updated.getExperienceYears());
        existing.setHourlyRate(updated.getHourlyRate());
        existing.setRating(updated.getRating());
        existing.setReview(updated.getReview());
        existing.setDescription(updated.getDescription());
        existing.setServiceWorker(updated.getServiceWorker());
    }

    /**
     * Desactiva un cuidador.
     */
    public ResponseEntity<User> disableCaregiver(int id) {
        try {
            Optional<User> userOpt = Optional.ofNullable(userRepository.getUser(id));
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            User user = userOpt.get();
            user.setRole(User.ROLE_USER);
//            userRepository.updateUser(
//                    user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getCity(),
//                    user.getAddress(), user.getPhoneNumber(), user.getZipCode(), user.getGender(),
//                    user.getProfilePicture(), user.getRole(), user.getLanguages(),
//                    user.getPaymentMethod(), user.getBirthDate()
//            );

            CaregiverWorker caregiverWorker = caregiverWorkerRepository.getCaregiverWorkersByUser(id);
            if (caregiverWorker != null) {
                caregiverWorker.setStatusActiveWork(false);
                caregiverWorkerRepository.updateCaregiverWorker(caregiverWorker);
            }

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Error disabling caregiver with ID {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Recupera cuidadores disponibles por especialidad.
     */
    public ResponseEntity<List<CaregiverWorker>> getAvailableCaregiversBySpeciality(String speciality) {
        try {
            List<CaregiverWorker> caregivers = caregiverWorkerRepository.getCaregiverWorkersBySpeciality(speciality);
            if (caregivers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(caregivers);
        } catch (Exception e) {
            logger.error("Error fetching caregivers by speciality {}: ", speciality, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Califica a un cuidador.
     */
    public ResponseEntity<CaregiverWorker> rateCaregiver(int id, CaregiverWorker caregiverWorker) {
        try {
            Optional<CaregiverWorker> caregiverToRate = Optional.ofNullable(caregiverWorkerRepository.getCaregiverWorker(id));
            if (caregiverToRate.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            caregiverToRate.get().setRating(caregiverWorker.getRating());
            caregiverWorkerRepository.updateCaregiverWorker(caregiverToRate.get());
            return ResponseEntity.ok(caregiverToRate.get());
        } catch (Exception e) {
            logger.error("Error rating caregiver with ID {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<List<CaregiverWorker>> getAvailableCaregivers() {
        try {
            List<CaregiverWorker> caregivers = caregiverWorkerRepository.getAvailableCaregiverWorkers();
            if (caregivers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(caregivers);
        } catch (Exception e) {
            logger.error("Error fetching available caregivers: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Verifica si un usuario es cuidador.
     *
     * @param userId el ID del usuario a verificar
     * @return ResponseEntity con true si es cuidador, false si no
     */
    public ResponseEntity<Boolean> checkIsCaregiver(int userId) {
        try {
            boolean isCaregiver = caregiverWorkerRepository.checkCaregiverExists(userId);
            return ResponseEntity.ok(isCaregiver);
        } catch (Exception e) {
            logger.error("Error checking caregiver status for user ID {}: ", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
