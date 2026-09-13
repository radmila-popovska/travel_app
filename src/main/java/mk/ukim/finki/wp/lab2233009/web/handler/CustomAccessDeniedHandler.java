package mk.ukim.finki.wp.lab2233009.web.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(
            new AccessDeniedResponse(
                HttpServletResponse.SC_FORBIDDEN,
                "Access Denied",
                "You do not have permission to access this resource.",
                request.getRequestURI()
            )
        );

        response.getWriter().write(jsonResponse);
    }

    public static class AccessDeniedResponse {
        public final int status;
        public final String reason;
        public final String message;
        public final String path;

        public AccessDeniedResponse(int status, String reason, String message, String path) {
            this.status = status;
            this.reason = reason;
            this.message = message;
            this.path = path;
        }
    }
}

