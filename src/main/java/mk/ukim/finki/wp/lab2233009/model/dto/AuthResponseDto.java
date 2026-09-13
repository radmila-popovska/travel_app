package mk.ukim.finki.wp.lab2233009.model.dto;

import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Role;

public record AuthResponseDto(
        String token,
        String username,
        String name,
        String surname,
        String email,
        Role role
) {
    public static AuthResponseDto fromLogin(User user, String token) {
        return new AuthResponseDto(
                token,
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole()
        );
    }

    public static AuthResponseDto fromRegister(User user, String token) {
        return new AuthResponseDto(
                token,
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole()
        );
    }
}

