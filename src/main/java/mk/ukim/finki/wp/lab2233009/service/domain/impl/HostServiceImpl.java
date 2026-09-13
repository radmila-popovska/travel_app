package mk.ukim.finki.wp.lab2233009.service.domain.impl;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.Host;
import mk.ukim.finki.wp.lab2233009.repository.HostRepository;
import mk.ukim.finki.wp.lab2233009.service.domain.HostService;
import org.springframework.stereotype.Service;

@Service
public class HostServiceImpl implements HostService {
    private final HostRepository hostRepository;

    public HostServiceImpl(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    @Override
    public Optional<Host> findById(Long id) {
        return hostRepository.findById(id);
    }

    @Override
    public List<Host> findAll() {
        return hostRepository.findAll();
    }

    @Override
    public Host create(Host host) {
        return hostRepository.save(host);
    }

    @Override
    public Optional<Host> update(Long id, Host host) {
        return hostRepository
                .findById(id)
                .map((existingHost) -> {
                    existingHost.setName(host.getName());
                    existingHost.setCountry(host.getCountry());
                    existingHost.setSurname(host.getSurname());
                    return hostRepository.save(existingHost);
                });
    }

    @Override
    public Optional<Host> deleteById(Long id) {
        Optional<Host> host = hostRepository.findById(id);
        host.ifPresent(hostRepository::delete);
        return host;
    }
}
