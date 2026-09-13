package mk.ukim.finki.wp.lab2233009.repository;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.Accommodation;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
	List<Accommodation> findByRented(Boolean rented);

	@EntityGraph(value = "accommodation-host-country-graph")
	Optional<Accommodation> findWithHostAndCountryById(Long id);

	@Query("""
			select a
			from Accommodation a
			where (:category is null or a.category = :category)
			  and (:hostId is null or a.host.id = :hostId)
			  and (:countryId is null or a.host.country.id = :countryId)
			  and (:numRooms is null or a.numRooms = :numRooms)
			  and (
					:roomsAvailable is null
					or (
						:roomsAvailable = true
						and exists (
							select 1
							from Accommodation ha
							where ha.host.id = a.host.id
							  and ha.rented = false
							  and ha.numRooms > 0
						)
					)
					or (
						:roomsAvailable = false
						and not exists (
							select 1
							from Accommodation ha
							where ha.host.id = a.host.id
							  and ha.rented = false
							  and ha.numRooms > 0
						)
					)
			  )
			""")
	@EntityGraph(value = "accommodation-host-country-graph")
	Page<Accommodation> findAllWithFilters(
			@Param("category") Category category,
			@Param("hostId") Long hostId,
			@Param("countryId") Long countryId,
			@Param("numRooms") Integer numRooms,
			@Param("roomsAvailable") Boolean roomsAvailable,
			Pageable pageable
	);
}
