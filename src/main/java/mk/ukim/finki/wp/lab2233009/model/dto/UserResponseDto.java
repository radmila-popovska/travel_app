package mk.ukim.finki.wp.lab2233009.model.dto;

import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Role;

public record UserResponseDto(
        Long id,
        String username,
        String name,
        String surname,
        String email,
        Role role
) {
    public static UserResponseDto from(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole()
        );
    }
}

