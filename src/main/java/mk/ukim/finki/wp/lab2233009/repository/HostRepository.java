package mk.ukim.finki.wp.lab2233009.repository;

import mk.ukim.finki.wp.lab2233009.model.domain.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {
}
