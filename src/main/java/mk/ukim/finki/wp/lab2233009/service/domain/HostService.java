package mk.ukim.finki.wp.lab2233009.service.domain;

import mk.ukim.finki.wp.lab2233009.model.domain.Host;
import java.util.List;
import java.util.Optional;

public interface HostService {
    Optional<Host> findById(Long id);

    List<Host> findAll();

    Host create(Host host);

    Optional<Host> update(Long id, Host host);

    Optional<Host> deleteById(Long id);
}
