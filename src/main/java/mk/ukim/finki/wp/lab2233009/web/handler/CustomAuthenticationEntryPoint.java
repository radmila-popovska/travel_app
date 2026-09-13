package mk.ukim.finki.wp.lab2233009.web.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(
            new AuthenticationErrorResponse(
                HttpServletResponse.SC_UNAUTHORIZED,
                "Unauthorized",
                "Authentication required. Please log in to access this resource.",
                request.getRequestURI()
            )
        );

        response.getWriter().write(jsonResponse);
    }

    public static class AuthenticationErrorResponse {
        public final int status;
        public final String reason;
        public final String message;
        public final String path;

        public AuthenticationErrorResponse(int status, String reason, String message, String path) {
            this.status = status;
            this.reason = reason;
            this.message = message;
            this.path = path;
        }
    }
}

