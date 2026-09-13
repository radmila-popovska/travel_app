package mk.ukim.finki.wp.lab2233009.web.handler;

import mk.ukim.finki.wp.lab2233009.model.exception.AccommodationNotFoundException;
import mk.ukim.finki.wp.lab2233009.model.exception.HostCannotReserveOwnAccommodationException;
import mk.ukim.finki.wp.lab2233009.model.exception.ReservationAlreadyExistsForAccommodationException;
import mk.ukim.finki.wp.lab2233009.model.exception.ReservationAlreadyExistsForUserException;
import mk.ukim.finki.wp.lab2233009.web.controller.ReservationController;
import mk.ukim.finki.wp.lab2233009.web.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = ReservationController.class)
public class ReservationControllerExceptionHandler {

    @ExceptionHandler(AccommodationNotFoundException.class)
    public ResponseEntity<ApiError> handleAccommodationNotFound(AccommodationNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiError.of(HttpStatus.NOT_FOUND, exception.getMessage()));
    }

    @ExceptionHandler(HostCannotReserveOwnAccommodationException.class)
    public ResponseEntity<ApiError> handleHostCannotReserve(HostCannotReserveOwnAccommodationException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiError.of(HttpStatus.BAD_REQUEST, exception.getMessage()));
    }

    @ExceptionHandler({
            ReservationAlreadyExistsForUserException.class,
            ReservationAlreadyExistsForAccommodationException.class
    })
    public ResponseEntity<ApiError> handleReservationConflict(RuntimeException exception) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiError.of(HttpStatus.CONFLICT, exception.getMessage()));
    }
}

