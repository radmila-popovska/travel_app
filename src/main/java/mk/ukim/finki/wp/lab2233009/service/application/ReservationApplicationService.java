package mk.ukim.finki.wp.lab2233009.service.application;

import java.util.List;
import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.dto.CreateReservationDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayReservationDto;

public interface ReservationApplicationService {
    List<DisplayReservationDto> findAll();

    DisplayReservationDto reserve(User user, CreateReservationDto createReservationDto);
}

