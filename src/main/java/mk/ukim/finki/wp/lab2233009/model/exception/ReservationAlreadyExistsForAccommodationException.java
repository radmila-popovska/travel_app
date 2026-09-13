package mk.ukim.finki.wp.lab2233009.model.exception;

public class ReservationAlreadyExistsForAccommodationException extends RuntimeException {
    public ReservationAlreadyExistsForAccommodationException(Long accommodationId) {
        super("Accommodation %d already has a reservation.".formatted(accommodationId));
    }
}

