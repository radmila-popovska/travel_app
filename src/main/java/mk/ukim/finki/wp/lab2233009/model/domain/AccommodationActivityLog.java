package mk.ukim.finki.wp.lab2233009.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "accommodation_activity_logs")
public class AccommodationActivityLog extends BaseEntity {

    @Column(nullable = false)
    private String accommodationName;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;

    @Column(nullable = false)
    private String eventType;

    public AccommodationActivityLog(String accommodationName, LocalDateTime eventTimestamp, String eventType) {
        this.accommodationName = accommodationName;
        this.eventTimestamp = eventTimestamp;
        this.eventType = eventType;
    }
}

