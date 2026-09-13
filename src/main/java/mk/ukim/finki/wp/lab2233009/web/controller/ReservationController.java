package mk.ukim.finki.wp.lab2233009.web.controller;

import java.util.List;
import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.dto.CreateReservationDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayReservationDto;
import mk.ukim.finki.wp.lab2233009.service.application.ReservationApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationApplicationService reservationApplicationService;

    public ReservationController(ReservationApplicationService reservationApplicationService) {
        this.reservationApplicationService = reservationApplicationService;
    }

    @GetMapping
    public ResponseEntity<List<DisplayReservationDto>> findAll() {
        return ResponseEntity.ok(reservationApplicationService.findAll());
    }

    @PostMapping("/reserve")
    public ResponseEntity<DisplayReservationDto> reserve(
            @AuthenticationPrincipal User user,
            @RequestBody CreateReservationDto createReservationDto
    ) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(reservationApplicationService.reserve(user, createReservationDto));
    }
}

