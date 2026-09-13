package mk.ukim.finki.wp.lab2233009.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(
        name = "reservations",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_reservation_user", columnNames = "user_id"),
                @UniqueConstraint(name = "uk_reservation_accommodation", columnNames = "accommodation_id")
        }
)
public class Reservation extends BaseAuditableEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "accommodation_id", nullable = false)
    private Accommodation accommodation;

    @Column(nullable = false)
    private LocalDateTime reservedAt;

    @Column(nullable = false)
    private LocalDateTime releaseAt;

    public Reservation(User user, Accommodation accommodation, LocalDateTime reservedAt, LocalDateTime releaseAt) {
        this.user = user;
        this.accommodation = accommodation;
        this.reservedAt = reservedAt;
        this.releaseAt = releaseAt;
    }
}

