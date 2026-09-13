package mk.ukim.finki.wp.lab2233009.model.exception;

public class HostCannotReserveOwnAccommodationException extends RuntimeException {
    public HostCannotReserveOwnAccommodationException() {
        super("Host cannot reserve its own accommodation!");
    }
}

