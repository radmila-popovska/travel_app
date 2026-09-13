package mk.ukim.finki.wp.lab2233009.service.domain;

import java.time.LocalDateTime;
import java.util.List;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.Reservation;
import mk.ukim.finki.wp.lab2233009.model.domain.User;

public interface ReservationService {
    List<Reservation> findAll();

    Reservation reserve(User user, Accommodation accommodation, LocalDateTime reservedAt, LocalDateTime releaseAt);
}

