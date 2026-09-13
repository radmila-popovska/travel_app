package mk.ukim.finki.wp.lab2233009.model.exception;

public class CountryNotFoundException extends RuntimeException {
    public CountryNotFoundException(Long id) {
        super("A country with id %d does not exist.".formatted(id));
    }
}
