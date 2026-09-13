package mk.ukim.finki.wp.lab2233009.listener;

import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.wp.lab2233009.model.domain.AccommodationActivityLog;
import mk.ukim.finki.wp.lab2233009.model.events.AccommodationRentedEvent;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationActivityLogRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
public class AccommodationRentedEventListener {

    private final AccommodationActivityLogRepository accommodationActivityLogRepository;

    public AccommodationRentedEventListener(AccommodationActivityLogRepository accommodationActivityLogRepository) {
        this.accommodationActivityLogRepository = accommodationActivityLogRepository;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void onAccommodationRented(AccommodationRentedEvent event) {
        log.info("Accommodation rented: id={}, name='{}'", event.accommodationId(), event.accommodationName());

        AccommodationActivityLog activityLog = accommodationActivityLogRepository.saveAndFlush(new AccommodationActivityLog(
                event.accommodationName(),
                LocalDateTime.now(),
                "ACCOMMODATION_RENTED"
        ));
        log.info("Activity log saved: id={}, eventType={}", activityLog.getId(), activityLog.getEventType());

        if (event.numRooms() != null && event.numRooms() == 0) {
            log.warn("Accommodation id={} is fully booked (numRooms=0).", event.accommodationId());
        }
    }
}

