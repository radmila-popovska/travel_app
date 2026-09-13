package mk.ukim.finki.wp.lab2233009.service.domain.impl;

import java.time.LocalDateTime;
import java.util.List;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.Reservation;
import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.exception.ReservationAlreadyExistsForAccommodationException;
import mk.ukim.finki.wp.lab2233009.model.exception.ReservationAlreadyExistsForUserException;
import mk.ukim.finki.wp.lab2233009.repository.ReservationRepository;
import mk.ukim.finki.wp.lab2233009.service.domain.ReservationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    @Transactional
    public Reservation reserve(User user, Accommodation accommodation, LocalDateTime reservedAt, LocalDateTime releaseAt) {
        if (reservationRepository.existsByUser_Id(user.getId())) {
            throw new ReservationAlreadyExistsForUserException(user.getId());
        }
        if (reservationRepository.existsByAccommodation_Id(accommodation.getId())) {
            throw new ReservationAlreadyExistsForAccommodationException(accommodation.getId());
        }
        Reservation reservation = new Reservation(user, accommodation, reservedAt, releaseAt);
        return reservationRepository.save(reservation);
    }
}

