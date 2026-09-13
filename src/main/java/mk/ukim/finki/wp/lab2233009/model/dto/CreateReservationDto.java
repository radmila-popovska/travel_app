package mk.ukim.finki.wp.lab2233009.model.dto;

import java.time.LocalDateTime;

public record CreateReservationDto(
        Long accommodationId,
        LocalDateTime reservedAt,
        LocalDateTime releaseAt
) {
}

