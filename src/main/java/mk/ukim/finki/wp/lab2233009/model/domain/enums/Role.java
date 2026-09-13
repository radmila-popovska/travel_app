package mk.ukim.finki.wp.lab2233009.model.domain.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_USER,
    ROLE_ADMINISTRATOR;

    @Override
    public String getAuthority() {
        return name();
    }
}