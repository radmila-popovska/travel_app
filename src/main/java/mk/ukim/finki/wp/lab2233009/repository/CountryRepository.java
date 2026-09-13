package mk.ukim.finki.wp.lab2233009.repository;

import mk.ukim.finki.wp.lab2233009.model.domain.Country;
import mk.ukim.finki.wp.lab2233009.model.views.CountryHostCountProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
	@Query("""
			select c.id as countryId,
				   c.name as countryName,
				   count(h.id) as hostCount
			from Country c
			left join Host h on h.country = c
			group by c.id, c.name
			order by count(h.id) desc, c.id asc
			""")
	List<CountryHostCountProjection> findAllHostCountProjections();
}
