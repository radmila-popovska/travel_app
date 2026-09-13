package mk.ukim.finki.wp.lab2233009.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Getter;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import org.hibernate.annotations.Immutable;

@Entity
@Getter
@Immutable
@Table(name = "accommodation_category_stats_mv")
public class AccommodationCategoryStatsView {
    @Id
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "total_accommodations")
    private Long totalAccommodations;

    @Column(name = "total_rooms")
    private Long totalRooms;

    @Column(name = "average_rooms")
    private BigDecimal averageRooms;
}

