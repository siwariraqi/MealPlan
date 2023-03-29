package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public class UserDetailsServiceImpl {
    //implements UserDetailsService
    /*
    @Service
    @Autowired
    private UsersDAO usersDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = usersDAO.findById(Long.valueOf(username));
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User not found with userId: " + username);
        }
        Role role = user.get().getUserRole();
        List<GrantedAuthority> authorities = new ArrayList<>();
        if(role.equals(Role.Admin)){
            authorities.add(new SimpleGrantedAuthority(Role.User.name()));
        }
        authorities.add(new SimpleGrantedAuthority(role.name()));
        return new org.springframework.security.core.userdetails.User(user.get().getUserId().toString(), user.get().getPassword(),
                authorities);
    }
     */
}
