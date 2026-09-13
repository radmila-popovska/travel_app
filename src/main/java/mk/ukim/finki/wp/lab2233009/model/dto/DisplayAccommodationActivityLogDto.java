package mk.ukim.finki.wp.lab2233009.model.dto;

import java.time.LocalDateTime;
import mk.ukim.finki.wp.lab2233009.model.domain.AccommodationActivityLog;

public record DisplayAccommodationActivityLogDto(
        Long id,
        String accommodationName,
        LocalDateTime eventTimestamp,
        String eventType
) {
    public static DisplayAccommodationActivityLogDto from(AccommodationActivityLog log) {
        return new DisplayAccommodationActivityLogDto(
                log.getId(),
                log.getAccommodationName(),
                log.getEventTimestamp(),
                log.getEventType()
        );
    }
}

