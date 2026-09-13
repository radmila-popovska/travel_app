package mk.ukim.finki.wp.lab2233009.repository;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select name, surname, email from users", nativeQuery = true)
    List<UserProjection> findAllWithNameSurnameAndEmail();

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
}
