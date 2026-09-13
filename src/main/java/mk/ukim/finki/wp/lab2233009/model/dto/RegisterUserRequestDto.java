package mk.ukim.finki.wp.lab2233009.model.dto;

import mk.ukim.finki.wp.lab2233009.model.domain.User;

public record RegisterUserRequestDto(
        String name,
        String surname,
        String email,
        String username,
        String password
) {
    public User toUser() {
        return new User(name, surname, email, username, password);
    }
}
