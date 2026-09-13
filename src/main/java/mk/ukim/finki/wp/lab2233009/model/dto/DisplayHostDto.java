package mk.ukim.finki.wp.lab2233009.model.dto;
import mk.ukim.finki.wp.lab2233009.model.domain.Host;
import java.util.List;

public record DisplayHostDto(
        Long id,
        String name,
        String surname,
        Long countryId
) {
    public static DisplayHostDto from(Host h) {
        return new DisplayHostDto(
                h.getId(),
                h.getName(),
                h.getSurname(),
                h.getCountry().getId()
        );
    }

    public static List<DisplayHostDto> from(List<Host> h) {
        return h
                .stream()
                .map(DisplayHostDto::from)
                .toList();
    }
}
