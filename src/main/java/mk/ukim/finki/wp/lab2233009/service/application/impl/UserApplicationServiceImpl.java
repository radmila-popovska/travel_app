package mk.ukim.finki.wp.lab2233009.service.application.impl;

import java.util.Optional;
import mk.ukim.finki.wp.lab2233009.helpers.JwtHelper;
import mk.ukim.finki.wp.lab2233009.model.domain.User;
import mk.ukim.finki.wp.lab2233009.model.dto.LoginUserRequestDto;
import mk.ukim.finki.wp.lab2233009.model.dto.LoginUserResponseDto;
import mk.ukim.finki.wp.lab2233009.model.dto.RegisterUserRequestDto;
import mk.ukim.finki.wp.lab2233009.model.dto.RegisterUserResponseDto;
import mk.ukim.finki.wp.lab2233009.service.application.UserApplicationService;
import mk.ukim.finki.wp.lab2233009.service.domain.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserApplicationServiceImpl implements UserApplicationService {
    private final UserService userService;
    private final JwtHelper jwtHelper;

    public UserApplicationServiceImpl(UserService userService, JwtHelper jwtHelper) {
        this.userService = userService;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto) {
        User user = userService.register(registerUserRequestDto.toUser());
        String token = jwtHelper.generateToken(user);
        RegisterUserResponseDto displayUserDto = RegisterUserResponseDto.from(user, token);
        return Optional.of(displayUserDto);
    }

    @Override
    public Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto) {
        User user = userService.login(loginUserRequestDto.username(), loginUserRequestDto.password());

        String token = jwtHelper.generateToken(user);

        return Optional.of(LoginUserResponseDto.from(user, token));
    }

    @Override
    public Optional<RegisterUserResponseDto> findByUsername(String username) {
        return userService
                .findByUsername(username)
                .map(RegisterUserResponseDto::from);
    }
}
