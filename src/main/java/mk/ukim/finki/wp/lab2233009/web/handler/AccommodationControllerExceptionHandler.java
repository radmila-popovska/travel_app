package mk.ukim.finki.wp.lab2233009.web.handler;

import mk.ukim.finki.wp.lab2233009.model.exception.AccommodationNotFoundException;
import mk.ukim.finki.wp.lab2233009.model.exception.HostNotFoundException;
import mk.ukim.finki.wp.lab2233009.web.controller.AccommodationController;
import mk.ukim.finki.wp.lab2233009.web.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice(assignableTypes = AccommodationController.class)
public class AccommodationControllerExceptionHandler {

    @ExceptionHandler(AccommodationNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(AccommodationNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiError.of(HttpStatus.NOT_FOUND, exception.getMessage()));
    }

    @ExceptionHandler(HostNotFoundException.class)
    public ResponseEntity<ApiError> handleHostNotFound(HostNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiError.of(HttpStatus.NOT_FOUND, exception.getMessage()));
    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException exception) {
//        String message = exception.getBindingResult().getFieldErrors()
//                .stream()
//                .map(e -> e.getField() + ": " + e.getDefaultMessage())
//                .collect(Collectors.joining("; "));
//        return ResponseEntity
//                .status(HttpStatus.BAD_REQUEST)
//                .body(ApiError.of(HttpStatus.BAD_REQUEST, message));
//    }
}
