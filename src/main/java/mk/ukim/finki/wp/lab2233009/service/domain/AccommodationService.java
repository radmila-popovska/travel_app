package mk.ukim.finki.wp.lab2233009.service.domain;

import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.AccommodationActivityLog;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationCategoryStatsView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationExtendedView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationShortView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AccommodationService {
    Optional<Accommodation> findById(Long id);

    Page<Accommodation> findAll(Pageable pageable, Category category, Long hostId, Long countryId, Integer numRooms, Boolean roomsAvailable);

    Accommodation create(Accommodation accommodation);

    Optional<Accommodation> update(Long id, Accommodation accommodation);

    Optional<Accommodation> deleteById(Long id);

    List<Accommodation> findByRented(Boolean rented);

    List<AccommodationShortView> findAllShortViews();

    List<AccommodationExtendedView> findAllExtendedViews();

    List<AccommodationCategoryStatsView> findCategoryStats();

    Page<AccommodationActivityLog> findActivityLogs(Pageable pageable);

    Optional<Accommodation> setRented(Long id);
}
