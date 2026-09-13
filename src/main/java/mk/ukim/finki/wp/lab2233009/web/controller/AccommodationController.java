package mk.ukim.finki.wp.lab2233009.web.controller;

import jakarta.validation.Valid;
import java.util.Locale;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayAccommodationActivityLogDto;
import mk.ukim.finki.wp.lab2233009.model.dto.CreateAccommodationDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayAccommodationDto;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationCategoryStatsView;
import mk.ukim.finki.wp.lab2233009.service.application.AccommodationApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

    private final AccommodationApplicationService accommodationApplicationService;

    public AccommodationController(AccommodationApplicationService accommodationApplicationService) {
        this.accommodationApplicationService = accommodationApplicationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayAccommodationDto> findById(@PathVariable Long id) {
        return accommodationApplicationService
                .findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<DisplayAccommodationDto>> findAll(
            Pageable pageable,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Long hostId,
            @RequestParam(required = false) Long countryId,
            @RequestParam(required = false) Integer numRooms,
            @RequestParam(required = false) Boolean roomsAvailable
    ) {
        return ResponseEntity.ok(accommodationApplicationService.findAll(
                pageable,
                category,
                hostId,
                countryId,
                numRooms,
                roomsAvailable
        ));
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayAccommodationDto> create(@RequestBody @Valid CreateAccommodationDto createProductDto) {
        return ResponseEntity.ok(accommodationApplicationService.create(createProductDto));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<DisplayAccommodationDto> update(
            @PathVariable Long id,
            @RequestBody CreateAccommodationDto createProductDto
    ) {
        return accommodationApplicationService
                .update(id, createProductDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<DisplayAccommodationDto> deleteById(@PathVariable Long id) {
        return accommodationApplicationService
                .deleteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/rented/{rented}")
    public ResponseEntity<List<DisplayAccommodationDto>> findByRented(@PathVariable Boolean rented) {
        return ResponseEntity.ok(accommodationApplicationService.findByRented(rented));
    }

    @GetMapping("/projections")
    public ResponseEntity<List<?>> findAllByProjection(@RequestParam(defaultValue = "short") String view) {
        String normalizedView = view.trim().toLowerCase(Locale.ROOT);
        return switch (normalizedView) {
            case "short" -> ResponseEntity.ok(accommodationApplicationService.findAllShortViews());
            case "extended" -> ResponseEntity.ok(accommodationApplicationService.findAllExtendedViews());
            default -> ResponseEntity.badRequest().build();
        };
    }

    @GetMapping("/stats/categories")
    public ResponseEntity<List<AccommodationCategoryStatsView>> findCategoryStats() {
        return ResponseEntity.ok(accommodationApplicationService.findCategoryStats());
    }

    @GetMapping("/activity-logs")
    public ResponseEntity<Page<DisplayAccommodationActivityLogDto>> findActivityLogs(Pageable pageable) {
        return ResponseEntity.ok(accommodationApplicationService.findActivityLogs(pageable));
    }

    @PutMapping("/{id}/rent")
    public ResponseEntity<DisplayAccommodationDto> setRented(@PathVariable Long id) {
        return accommodationApplicationService.setRented(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
