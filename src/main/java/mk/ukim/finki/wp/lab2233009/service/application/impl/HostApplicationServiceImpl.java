package mk.ukim.finki.wp.lab2233009.service.application.impl;


import java.util.List;
import java.util.Optional;

import mk.ukim.finki.wp.lab2233009.model.domain.Country;
import mk.ukim.finki.wp.lab2233009.model.dto.CreateHostDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayHostDto;
import mk.ukim.finki.wp.lab2233009.model.exception.CountryNotFoundException;
import mk.ukim.finki.wp.lab2233009.service.application.HostApplicationService;
import mk.ukim.finki.wp.lab2233009.service.domain.CountryService;
import mk.ukim.finki.wp.lab2233009.service.domain.HostService;
import org.springframework.stereotype.Service;

@Service
public class HostApplicationServiceImpl implements HostApplicationService {
    private final HostService hostService;
    private final CountryService countryService;

    public HostApplicationServiceImpl(HostService hostService, CountryService countryService) {
        this.hostService = hostService;
        this.countryService = countryService;
    }

    @Override
    public Optional<DisplayHostDto> findById(Long id) {
        return hostService
                .findById(id)
                .map(DisplayHostDto::from);
    }

    @Override
    public List<DisplayHostDto> findAll() {
        return DisplayHostDto.from(hostService.findAll());
    }

    @Override
    public DisplayHostDto create(CreateHostDto createHostDto) {
        Country category = countryService
                .findById(createHostDto.countryId())
                .orElseThrow(() -> new CountryNotFoundException(createHostDto.countryId()));
        return DisplayHostDto.from(hostService.create(createHostDto.toHost(category)));
    }

    @Override
    public Optional<DisplayHostDto> update(Long id, CreateHostDto createHostDto) {
        Country category = countryService
                .findById(createHostDto.countryId())
                .orElseThrow(() -> new CountryNotFoundException(createHostDto.countryId()));
        return hostService
                .update(id, createHostDto.toHost(category))
                .map(DisplayHostDto::from);
    }

    @Override
    public Optional<DisplayHostDto> deleteById(Long id) {
        return hostService
                .deleteById(id)
                .map(DisplayHostDto::from);
    }
}
