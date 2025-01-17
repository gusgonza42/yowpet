package com.yowpet.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Date;
import java.util.Objects;

/**
 * Representa una entidad de reserva en el sistema.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Reservation")
public class Reservation {

    /**
     * El identificador único para la reserva.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "r_id")
    private Long r_id;

    /**
     * El usuario que hizo la reserva.
     */
    @ManyToOne
    @JoinColumn(name = "r_user_id", referencedColumnName = "u_id")
    private User r_user_id;

    /**
     * El cuidador asignado a la reserva.
     */
    @ManyToOne
    @JoinColumn(name = "r_care_giver_id", referencedColumnName = "u_id")
    private User r_care_giver_id;

    /**
     * La fecha y hora de la reserva.
     */
    @Column(name = "r_reservation_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date r_reservation_date;

    /**
     * El estado de la reserva.
     * Valores por defecto: 1 = activo, 0 = cancelado, 2 = completado.
     */
    @Column(name = "r_status")
    private int r_status = 1;

    /**
     * Verifica si esta reserva es igual a otro objeto.
     *
     * @param o el objeto con el que comparar
     * @return true si los objetos son iguales, false en caso contrario
     */
    @Override
    public final boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null)
            return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass)
            return false;
        Reservation that = (Reservation) o;
        return getR_id() != null && Objects.equals(getR_id(), that.getR_id());
    }

    /**
     * Devuelve el código hash de esta reserva.
     *
     * @return el código hash
     */
    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}