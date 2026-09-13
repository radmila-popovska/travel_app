package mk.ukim.finki.wp.lab2233009.service.application.impl;


import java.util.List;
import java.util.Optional;

import mk.ukim.finki.wp.lab2233009.model.dto.CreateCountryDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayCountryDto;
import mk.ukim.finki.wp.lab2233009.model.views.CountryHostCountProjection;
import mk.ukim.finki.wp.lab2233009.service.application.CountryApplicationService;
import mk.ukim.finki.wp.lab2233009.service.domain.CountryService;
import org.springframework.stereotype.Service;

@Service
public class CountryApplicationServiceImpl implements CountryApplicationService {
    private final CountryService countryService;

    public CountryApplicationServiceImpl(CountryService countryService) {
        this.countryService = countryService;
    }

    @Override
    public Optional<DisplayCountryDto> findById(Long id) {
        return countryService
                .findById(id)
                .map(DisplayCountryDto::from);
    }

    @Override
    public List<DisplayCountryDto> findAll() {
        return DisplayCountryDto.from(countryService.findAll());
    }

    @Override
    public List<CountryHostCountProjection> findAllHostCountProjections() {
        return countryService.findAllHostCountProjections();
    }

    @Override
    public DisplayCountryDto create(CreateCountryDto createCategoryDto) {
        return DisplayCountryDto.from(countryService.create(createCategoryDto.toCountry()));
    }

    @Override
    public Optional<DisplayCountryDto> update(Long id, CreateCountryDto createCategoryDto) {
        return countryService
                .update(id, createCategoryDto.toCountry())
                .map(DisplayCountryDto::from);
    }

    @Override
    public Optional<DisplayCountryDto> deleteById(Long id) {
        return countryService
                .deleteById(id)
                .map(DisplayCountryDto::from);
    }
}
