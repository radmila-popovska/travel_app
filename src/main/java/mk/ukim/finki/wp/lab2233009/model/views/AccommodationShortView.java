package mk.ukim.finki.wp.lab2233009.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import org.hibernate.annotations.Immutable;

@Entity
@Getter
@Immutable
@Table(name = "accommodation_short_view")
public class AccommodationShortView {
    @Id
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "num_rooms")
    private Integer numRooms;
}
