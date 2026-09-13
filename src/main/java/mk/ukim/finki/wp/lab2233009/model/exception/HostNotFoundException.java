package mk.ukim.finki.wp.lab2233009.model.exception;

public class HostNotFoundException extends RuntimeException {
    public HostNotFoundException(Long id) {
        super("A host with id %d does not exist.".formatted(id));
    }
}
