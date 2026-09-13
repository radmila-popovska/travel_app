package mk.ukim.finki.wp.lab2233009.model.dto;

import jakarta.validation.constraints.NotBlank;
import mk.ukim.finki.wp.lab2233009.model.domain.Country;
import mk.ukim.finki.wp.lab2233009.model.domain.Host;

public record CreateHostDto(
        @NotBlank
        String name,
        @NotBlank
        String surname,
        Long countryId
) {
    public Host toHost(Country country) {
        return new Host(name, surname, country);
    }
}
