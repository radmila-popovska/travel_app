package mk.ukim.finki.wp.lab2233009.model.dto;

import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Role;

public record LoginUserResponseDto(
        String token,
        String username,
        String name,
        String surname,
        String email,
        Role role
) {
    public static LoginUserResponseDto from(User user, String token) {
        return new LoginUserResponseDto(
                token,
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole()
        );
    }
}
