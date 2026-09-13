package mk.ukim.finki.wp.lab2233009.service.domain.impl;
import java.util.List;
import java.util.Optional;

import mk.ukim.finki.wp.lab2233009.model.domain.Country;
import mk.ukim.finki.wp.lab2233009.model.views.CountryHostCountProjection;
import mk.ukim.finki.wp.lab2233009.repository.CountryRepository;
import mk.ukim.finki.wp.lab2233009.service.domain.CountryService;
import org.springframework.stereotype.Service;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public Optional<Country> findById(Long id) {
        return countryRepository.findById(id);
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    @Override
    public List<CountryHostCountProjection> findAllHostCountProjections() {
        return countryRepository.findAllHostCountProjections();
    }

    @Override
    public Country create(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Optional<Country> update(Long id, Country country) {
        return countryRepository
                .findById(id)
                .map((existingCountry) -> {
                    existingCountry.setName(country.getName());
                    existingCountry.setContinent(country.getContinent());
                    return countryRepository.save(existingCountry);
                });
    }

    @Override
    public Optional<Country> deleteById(Long id) {
        Optional<Country> country = countryRepository.findById(id);
        country.ifPresent(countryRepository::delete);
        return country;
    }
}
