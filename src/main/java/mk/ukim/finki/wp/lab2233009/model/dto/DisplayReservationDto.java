package mk.ukim.finki.wp.lab2233009.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import mk.ukim.finki.wp.lab2233009.model.domain.Reservation;

public record DisplayReservationDto(
        Long id,
        Long userId,
        Long accommodationId,
        LocalDateTime reservedAt,
        LocalDateTime releaseAt
) {
    public static DisplayReservationDto from(Reservation reservation) {
        return new DisplayReservationDto(
                reservation.getId(),
                reservation.getUser().getId(),
                reservation.getAccommodation().getId(),
                reservation.getReservedAt(),
                reservation.getReleaseAt()
        );
    }

    public static List<DisplayReservationDto> from(List<Reservation> reservations) {
        return reservations
                .stream()
                .map(DisplayReservationDto::from)
                .toList();
    }
}

