package mk.ukim.finki.wp.lab2233009.service.domain;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.domain.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Optional<User> findByUsername(String username);

    List<User> findAll();

    Optional<User> findById(Long id);

    User register(User user);

    User login(String username, String password);
}
