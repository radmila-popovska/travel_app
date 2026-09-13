package mk.ukim.finki.wp.lab2233009.service.application.impl;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.Host;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.dto.CreateAccommodationDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayAccommodationActivityLogDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayAccommodationDto;
import mk.ukim.finki.wp.lab2233009.model.exception.HostNotFoundException;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationCategoryStatsView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationExtendedView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationShortView;
import mk.ukim.finki.wp.lab2233009.service.application.AccommodationApplicationService;
import mk.ukim.finki.wp.lab2233009.service.domain.AccommodationService;
import mk.ukim.finki.wp.lab2233009.service.domain.HostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AccommodationApplicationServiceImpl implements AccommodationApplicationService {
    private final HostService hostService;
    private final AccommodationService accommodationService;

    public AccommodationApplicationServiceImpl(HostService hostService, AccommodationService accommodationService) {
        this.hostService = hostService;
        this.accommodationService = accommodationService;
    }

    @Override
    public Optional<DisplayAccommodationDto> findById(Long id) {
        return accommodationService
                .findById(id)
                .map(DisplayAccommodationDto::from);
    }

    @Override
    public Page<DisplayAccommodationDto> findAll(
            Pageable pageable,
            Category category,
            Long hostId,
            Long countryId,
            Integer numRooms,
            Boolean roomsAvailable
    ) {
        return accommodationService
                .findAll(pageable, category, hostId, countryId, numRooms, roomsAvailable)
                .map(DisplayAccommodationDto::from);
    }

    @Override
    public DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto) {
        Host host = hostService
                .findById(createAccommodationDto.hostId())
                .orElseThrow(() -> new HostNotFoundException(createAccommodationDto.hostId()));
        return DisplayAccommodationDto.from(accommodationService.create(createAccommodationDto.toAccommodation(host)));
    }

    @Override
    public Optional<DisplayAccommodationDto> update(Long id, CreateAccommodationDto createAccommodationDto) {
        Host host = hostService
                .findById(createAccommodationDto.hostId())
                .orElseThrow(() -> new HostNotFoundException(createAccommodationDto.hostId()));
        return accommodationService
                .update(id, createAccommodationDto.toAccommodation(host))
                .map(DisplayAccommodationDto::from);

    }
    @Override
    public Optional<DisplayAccommodationDto> deleteById(Long id) {
        return accommodationService
                .deleteById(id)
                .map(DisplayAccommodationDto::from);
    }

    @Override
    public List<DisplayAccommodationDto> findByRented(Boolean rented) {
        return DisplayAccommodationDto.from(accommodationService.findByRented(rented));
    }

    @Override
    public List<AccommodationShortView> findAllShortViews() {
        return accommodationService.findAllShortViews();
    }

    @Override
    public List<AccommodationExtendedView> findAllExtendedViews() {
        return accommodationService.findAllExtendedViews();
    }

    @Override
    public List<AccommodationCategoryStatsView> findCategoryStats() {
        return accommodationService.findCategoryStats();
    }

    @Override
    public Page<DisplayAccommodationActivityLogDto> findActivityLogs(Pageable pageable) {
        return accommodationService.findActivityLogs(pageable)
                .map(DisplayAccommodationActivityLogDto::from);
    }

    @Override
    public Optional<DisplayAccommodationDto> setRented(Long id) {
        return accommodationService.setRented(id).map(DisplayAccommodationDto::from);
    }
}
