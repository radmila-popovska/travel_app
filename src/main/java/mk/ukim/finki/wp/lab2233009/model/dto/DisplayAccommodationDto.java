package mk.ukim.finki.wp.lab2233009.model.dto;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Condition;

import java.util.List;


public record DisplayAccommodationDto(
        Long id,
        String name,
        Category category,
        Condition condition,
        Integer numRooms,
        Long hostId,
        Boolean rented
) {
    public static DisplayAccommodationDto from(Accommodation a) {
        return new DisplayAccommodationDto(
                a.getId(),
                a.getName(),
                a.getCategory(),
                a.getCondition(),
                a.getNumRooms(),
                a.getHost().getId(),
                a.getRented()
        );
    }

    public static List<DisplayAccommodationDto> from(List<Accommodation> a) {
        return a
                .stream()
                .map(DisplayAccommodationDto::from)
                .toList();
    }
}
