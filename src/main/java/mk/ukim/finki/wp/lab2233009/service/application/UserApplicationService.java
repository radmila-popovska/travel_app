package mk.ukim.finki.wp.lab2233009.service.application;

import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.model.dto.LoginUserRequestDto;
import mk.ukim.finki.wp.lab2233009.model.dto.LoginUserResponseDto;
import mk.ukim.finki.wp.lab2233009.model.dto.RegisterUserRequestDto;
import mk.ukim.finki.wp.lab2233009.model.dto.RegisterUserResponseDto;

public interface UserApplicationService {
    Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto);

    Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto);

    Optional<RegisterUserResponseDto> findByUsername(String username);
}
