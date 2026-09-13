package mk.ukim.finki.wp.lab2233009.service.application;

import mk.ukim.finki.wp.lab2233009.model.dto.CreateCountryDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayCountryDto;
import mk.ukim.finki.wp.lab2233009.model.views.CountryHostCountProjection;
import java.util.List;
import java.util.Optional;


public interface CountryApplicationService {

    Optional<DisplayCountryDto> findById(Long id);

    List<DisplayCountryDto> findAll();

    List<CountryHostCountProjection> findAllHostCountProjections();

    DisplayCountryDto create(CreateCountryDto createCountryDto);

    Optional<DisplayCountryDto> update(Long id, CreateCountryDto createCountryDto);

    Optional<DisplayCountryDto> deleteById(Long id);
}
