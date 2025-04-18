package spring.aop.gazettemanagementnic.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException{

        // Get the authenticated user's username
        String username = authentication.getName();

        // Store username in the session
        request.getSession().setAttribute("loggedInUser", username);


        // Determine the target URL based on the user's role
        String targetUrl = "/home"; // default fallback

        if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("CREATOR"))) {
            targetUrl = "/creator";
            
        } else if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("PUBLISHER"))) {
            targetUrl = "/publisher/publisher_display";
        } else if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ADMIN"))) {
            targetUrl = "/admin/admin_display";
        }

        response.sendRedirect(targetUrl);
    }
}
