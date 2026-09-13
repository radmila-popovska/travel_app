package mk.ukim.finki.wp.lab2233009.service.domain.impl;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.AccommodationActivityLog;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.events.AccommodationRentedEvent;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationCategoryStatsView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationExtendedView;
import mk.ukim.finki.wp.lab2233009.model.views.AccommodationShortView;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationActivityLogRepository;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationCategoryStatsViewRepository;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationExtendedViewRepository;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationRepository;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationShortViewRepository;
import mk.ukim.finki.wp.lab2233009.repository.ReservationRepository;
import mk.ukim.finki.wp.lab2233009.service.domain.AccommodationService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccommodationServiceImpl implements AccommodationService {
    private final AccommodationRepository accommodationRepository;
    private final AccommodationShortViewRepository accommodationShortViewRepository;
    private final AccommodationExtendedViewRepository accommodationExtendedViewRepository;
    private final AccommodationCategoryStatsViewRepository accommodationCategoryStatsViewRepository;
    private final AccommodationActivityLogRepository accommodationActivityLogRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final ReservationRepository reservationRepository;

    public AccommodationServiceImpl(
            AccommodationRepository accommodationRepository,
            AccommodationShortViewRepository accommodationShortViewRepository,
            AccommodationExtendedViewRepository accommodationExtendedViewRepository,
            AccommodationCategoryStatsViewRepository accommodationCategoryStatsViewRepository,
            AccommodationActivityLogRepository accommodationActivityLogRepository,
            ApplicationEventPublisher applicationEventPublisher,
            ReservationRepository reservationRepository
    ) {
        this.accommodationRepository = accommodationRepository;
        this.accommodationShortViewRepository = accommodationShortViewRepository;
        this.accommodationExtendedViewRepository = accommodationExtendedViewRepository;
        this.accommodationCategoryStatsViewRepository = accommodationCategoryStatsViewRepository;
        this.accommodationActivityLogRepository = accommodationActivityLogRepository;
        this.applicationEventPublisher = applicationEventPublisher;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public Optional<Accommodation> findById(Long id) {
        return accommodationRepository.findWithHostAndCountryById(id);
    }

    @Override
    public Page<Accommodation> findAll(
            Pageable pageable,
            Category category,
            Long hostId,
            Long countryId,
            Integer numRooms,
            Boolean roomsAvailable
    ) {
        Pageable sanitizedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sanitizeSort(pageable.getSort())
        );
        return accommodationRepository.findAllWithFilters(
                category,
                hostId,
                countryId,
                numRooms,
                roomsAvailable,
                sanitizedPageable
        );
    }

    private Sort sanitizeSort(Sort sort) {
        if (sort == null || sort.isUnsorted()) {
            return Sort.by(Sort.Direction.DESC, "createdAt");
        }

        List<Sort.Order> allowedOrders = sort.stream()
                .filter(order -> "name".equals(order.getProperty()) || "createdAt".equals(order.getProperty()))
                .toList();

        if (allowedOrders.isEmpty()) {
            return Sort.by(Sort.Direction.DESC, "createdAt");
        }

        return Sort.by(allowedOrders);
    }

    @Override
    public Accommodation create(Accommodation accommodation) {
        return accommodationRepository.save(accommodation);
    }

    @Override
    public Optional<Accommodation> update(Long id, Accommodation accommodation) {
        return accommodationRepository
                .findById(id)
                .map((existingAccommodation) -> {
                    existingAccommodation.setName(accommodation.getName());
                    existingAccommodation.setCategory(accommodation.getCategory());
                    existingAccommodation.setCondition(accommodation.getCondition());
                    existingAccommodation.setHost(accommodation.getHost());
                    existingAccommodation.setNumRooms(accommodation.getNumRooms());
                    return accommodationRepository.save(existingAccommodation);
                });
    }

    @Override
    @Transactional
    public Optional<Accommodation> deleteById(Long id) {
        reservationRepository.deleteByAccommodation_Id(id);
        Optional<Accommodation> accommodation = accommodationRepository.findById(id);
        accommodation.ifPresent(accommodationRepository::delete);
        return accommodation;
    }

    @Override
    public List<Accommodation> findByRented(Boolean rented) {
        return accommodationRepository.findByRented(rented);
    }

    @Override
    public List<AccommodationShortView> findAllShortViews() {
        return accommodationShortViewRepository.findAll(Sort.by("id"));
    }

    @Override
    public List<AccommodationExtendedView> findAllExtendedViews() {
        return accommodationExtendedViewRepository.findAll(Sort.by("id"));
    }

    @Override
    public List<AccommodationCategoryStatsView> findCategoryStats() {
        return accommodationCategoryStatsViewRepository.findAll(Sort.by("category"));
    }

    @Override
    public Page<AccommodationActivityLog> findActivityLogs(Pageable pageable) {
        return accommodationActivityLogRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Optional<Accommodation> setRented(Long id) {
        return accommodationRepository.findById(id).map(accommodation -> {
            accommodation.setRented(true);
            Accommodation rentedAccommodation = accommodationRepository.save(accommodation);
            applicationEventPublisher.publishEvent(new AccommodationRentedEvent(
                    rentedAccommodation.getId(),
                    rentedAccommodation.getName(),
                    rentedAccommodation.getNumRooms()
            ));
            return rentedAccommodation;
        });
    }
}
