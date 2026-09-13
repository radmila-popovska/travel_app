package mk.ukim.finki.wp.lab2233009.service.domain;

import mk.ukim.finki.wp.lab2233009.model.domain.Country;
import mk.ukim.finki.wp.lab2233009.model.views.CountryHostCountProjection;
import java.util.List;
import java.util.Optional;

public interface CountryService {
    Optional<Country> findById(Long id);

    List<Country> findAll();

    List<CountryHostCountProjection> findAllHostCountProjections();

    Country create(Country country);

    Optional<Country> update(Long id, Country country);

    Optional<Country> deleteById(Long id);
}
