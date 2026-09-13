package mk.ukim.finki.wp.lab2233009.repository;

import mk.ukim.finki.wp.lab2233009.model.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    boolean existsByUser_Id(Long userId);

    boolean existsByAccommodation_Id(Long accommodationId);

    void deleteByAccommodation_Id(Long accommodationId);
}
