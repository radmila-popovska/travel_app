package mk.ukim.finki.wp.lab2233009.model.exception;

public class ReservationAlreadyExistsForUserException extends RuntimeException {
    public ReservationAlreadyExistsForUserException(Long userId) {
        super("User %d already has a reservation.".formatted(userId));
    }
}

