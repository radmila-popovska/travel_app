package mk.ukim.finki.wp.lab2233009.service.application;

import mk.ukim.finki.wp.lab2233009.model.dto.CreateAccommodationDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayAccommodationActivityLogDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayAccommodationDto;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationCategoryStatsView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationExtendedView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationShortView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface AccommodationApplicationService {

    Optional<DisplayAccommodationDto> findById(Long id);

    Page<DisplayAccommodationDto> findAll(Pageable pageable, Category category, Long hostId, Long countryId, Integer numRooms, Boolean roomsAvailable);

    DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto);

    Optional<DisplayAccommodationDto> update(Long id, CreateAccommodationDto createAccommodationDto);

    Optional<DisplayAccommodationDto> deleteById(Long id);

    List<DisplayAccommodationDto> findByRented(Boolean rented);

    List<AccommodationShortView> findAllShortViews();

    List<AccommodationExtendedView> findAllExtendedViews();

    List<AccommodationCategoryStatsView> findCategoryStats();

    Page<DisplayAccommodationActivityLogDto> findActivityLogs(Pageable pageable);

    Optional<DisplayAccommodationDto> setRented(Long id);
}
