package mk.ukim.finki.wp.lab2233009.model.exception;


public class AccommodationNotFoundException extends RuntimeException {
    public AccommodationNotFoundException(Long id) {
        super("An accommodation with id %d does not exist.".formatted(id));
    }
}
