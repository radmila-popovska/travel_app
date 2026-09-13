package mk.ukim.finki.wp.lab2233009.model.events;

public record AccommodationRentedEvent(
        Long accommodationId,
        String accommodationName,
        Integer numRooms
) {
}

