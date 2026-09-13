package mk.ukim.finki.wp.lab2233009.web.controller;

import jakarta.validation.Valid;
import mk.ukim.finki.wp.lab2233009.model.dto.CreateCountryDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayCountryDto;
import mk.ukim.finki.wp.lab2233009.model.views.CountryHostCountProjection;
import mk.ukim.finki.wp.lab2233009.service.application.CountryApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryApplicationService countryApplicationService;

    public CountryController(CountryApplicationService countryApplicationService) {
        this.countryApplicationService = countryApplicationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayCountryDto> findById(@PathVariable Long id) {
        return countryApplicationService
                .findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<DisplayCountryDto>> findAll() {
        return ResponseEntity.ok(countryApplicationService.findAll());
    }

    @GetMapping("/projections")
    public ResponseEntity<List<CountryHostCountProjection>> findAllHostCountProjections() {
        return ResponseEntity.ok(countryApplicationService.findAllHostCountProjections());
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayCountryDto> create(@RequestBody @Valid CreateCountryDto createProductDto) {
        return ResponseEntity.ok(countryApplicationService.create(createProductDto));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<DisplayCountryDto> update(
            @PathVariable Long id,
            @RequestBody CreateCountryDto createProductDto
    ) {
        return countryApplicationService
                .update(id, createProductDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<DisplayCountryDto> deleteById(@PathVariable Long id) {
        return countryApplicationService
                .deleteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
