package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlanBL {
    @Autowired
    private UsersDAO usersDAO;


    public Plan getPlan(Long userid) throws UserNotFoundException {

        Optional<User> users = this.usersDAO.findById(userid);
        if (users.isPresent()) {
            User user = users.get();
            Plan plan = user.getPlan();
            return plan;
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

}
