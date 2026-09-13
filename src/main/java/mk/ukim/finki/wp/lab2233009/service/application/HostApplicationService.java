package mk.ukim.finki.wp.lab2233009.service.application;

import mk.ukim.finki.wp.lab2233009.model.dto.CreateHostDto;
import mk.ukim.finki.wp.lab2233009.model.dto.DisplayHostDto;
import java.util.List;
import java.util.Optional;


public interface HostApplicationService {

    Optional<DisplayHostDto> findById(Long id);

    List<DisplayHostDto> findAll();

    DisplayHostDto create(CreateHostDto createHostDto);

    Optional<DisplayHostDto> update(Long id, CreateHostDto createHostDto);

    Optional<DisplayHostDto> deleteById(Long id);
}
