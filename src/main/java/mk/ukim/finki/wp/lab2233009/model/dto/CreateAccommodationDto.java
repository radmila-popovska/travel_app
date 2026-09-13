package mk.ukim.finki.wp.lab2233009.model.dto;

import jakarta.validation.constraints.Positive;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.Host;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Condition;

public record CreateAccommodationDto(
        String name,
        Category category,
        Condition condition,
        @Positive
        Integer numRooms,
        Long hostId,
        Boolean rented
) {
    public Accommodation toAccommodation(Host host) {
        return new Accommodation(name, category, host, condition, numRooms,rented);
    }
}
