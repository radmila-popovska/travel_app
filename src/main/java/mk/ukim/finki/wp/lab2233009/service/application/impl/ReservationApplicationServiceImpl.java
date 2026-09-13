package mk.ukim.finki.wp.lab2233009.service.application.impl;

import java.util.List;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.dto.CreateReservationDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayReservationDto;
import mk.ukim.finki.wp.lab2233009.model.exception.AccommodationNotFoundException;
import mk.ukim.finki.wp.lab2233009.model.exception.HostCannotReserveOwnAccommodationException;
import mk.ukim.finki.wp.lab2233009.service.application.ReservationApplicationService;
import mk.ukim.finki.wp.lab2233009.service.domain.AccommodationService;
import mk.ukim.finki.wp.lab2233009.service.domain.ReservationService;
import org.springframework.stereotype.Service;

@Service
public class ReservationApplicationServiceImpl implements ReservationApplicationService {
    private final ReservationService reservationService;
    private final AccommodationService accommodationService;

    public ReservationApplicationServiceImpl(ReservationService reservationService, AccommodationService accommodationService) {
        this.reservationService = reservationService;
        this.accommodationService = accommodationService;
    }

    @Override
    public List<DisplayReservationDto> findAll() {
        return DisplayReservationDto.from(reservationService.findAll());
    }

    @Override
    public DisplayReservationDto reserve(User user, CreateReservationDto createReservationDto) {
        Accommodation accommodation = accommodationService
                .findById(createReservationDto.accommodationId())
                .orElseThrow(() -> new AccommodationNotFoundException(createReservationDto.accommodationId()));

        if (user.getId() != null && user.getId().equals(accommodation.getHost().getId())) {
            throw new HostCannotReserveOwnAccommodationException();
        }

        return DisplayReservationDto.from(reservationService.reserve(
                user,
                accommodation,
                createReservationDto.reservedAt(),
                createReservationDto.releaseAt()
        ));
    }
}

