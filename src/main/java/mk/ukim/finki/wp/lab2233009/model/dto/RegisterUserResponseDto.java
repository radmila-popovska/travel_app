package mk.ukim.finki.wp.lab2233009.model.dto;

import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Role;

public record RegisterUserResponseDto(
        String token,
        String username,
        String name,
        String surname,
        String email,
        Role role
) {
    public static RegisterUserResponseDto from(User user, String token) {
        return new RegisterUserResponseDto(
                token,
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole()
        );
    }

    // For backward compatibility when token is not available
    public static RegisterUserResponseDto from(User user) {
        return new RegisterUserResponseDto(
                null,
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole()
        );
    }
}


