package org.backendmealplan.backendmealplan.security;
import java.util.List;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.enums.Role;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    UserBL userBL;
    private final AntPathMatcher matcher = new AntPathMatcher();

    private final List<String> protectedUrls = List.of("/admin/**");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        boolean isProtectedUrl = protectedUrls.stream().anyMatch(pattern -> matcher.match(pattern, path));
        if (isProtectedUrl) {
            String userId = request.getParameter("loggedInUserId");
            if (userId != null) {
                User user = null;
                try {
                    user = userBL.getUser(Long.parseLong(userId));
                } catch (userNotFoundException e) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
                if (user!=null && user.getUserRole() != Role.Admin) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            }
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
        }
        filterChain.doFilter(request, response);
    }
}
