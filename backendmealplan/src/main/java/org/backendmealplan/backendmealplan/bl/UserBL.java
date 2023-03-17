package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.GroceryList;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.backendmealplan.backendmealplan.dao.GoalsDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.dao.UsersInfoDAO;
import org.backendmealplan.backendmealplan.exceptions.UNAUTHORIZEDException;
import org.backendmealplan.backendmealplan.exceptions.userExistException;
import org.backendmealplan.backendmealplan.exceptions.userInfoNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserBL {
    private BCryptPasswordEncoder passwordEncoder;


    @Autowired
    UsersDAO usersDAO;

    @Autowired
    UsersInfoDAO usersInfoDAO;

    @Autowired
    GoalsDAO goalsDAO;

    @Autowired
    PlanBL planBL;

    @Autowired
    public UserBL(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    public User authentication(String email, String password) throws Exception {
        User user = usersDAO.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user; // Passwords match
        } else {
            throw new UNAUTHORIZEDException("wrong email or password");
        }

    }

    public User adduser(User user) throws userExistException {
        User u = this.usersDAO.findByEmail(user.getEmail());
        if (u != null) {
            throw new userExistException("Email already in use!");
        }
        String normalPassword = user.getPassword();
        String hashedPassword = passwordEncoder.encode(normalPassword);
        user.setPassword(hashedPassword);
        this.usersDAO.save(user);
        return user;
    }

    /*
    Goal: creating a new userInfo and adding it to the database - table:UserInfo.
    input: UserInfo object that contains some info (probably goals), no Id yet!.
    output: UserInfo object with Id (according to the database) plus some info (that was given in the input).
    */

    public UserInfo addUserInfoGoals(UserInfo userInfo) {
        UserInfo added = this.usersInfoDAO.save(userInfo);
        //update the goals table;
        //TODO: should we update the goals table manually?
        //added.setGoals(userInfo.getGoals());
        return added;
    }

    /*
     * Goal: updating some attributes in an existing userInfo in the database - table:UserInfo.
     * input: userInfoId - Id of userInfo that should be updated,
     *        userInfo: UserInfo object with matching Id to userInfoId that contains some new info.
     * output: None
     * exceptions: userInfoNotFound - indicating that no user with the given id was found.
     */
    public UserInfo updateUserInfo(Long userInfoId, UserInfo userInfo) throws userInfoNotFound {
        Optional<UserInfo> existingUsersInfo = this.usersInfoDAO.findById(userInfoId);
        if (existingUsersInfo.isPresent()) {
            return this.usersInfoDAO.save(userInfo);
        } else {
            throw new userInfoNotFound();
        }
    }


    public User userSetPlan( Long userId,  Long planId) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findUserByuserId(userId);
        if(user == null){
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        Plan plan = this.planBL.getPlanById(planId);
        if(plan == null){
            throw new UNAUTHORIZEDException("plan id doesn't Exist");
        }
        user.setPlan(plan);
        this.usersDAO.save(user);
        return user;
    }

    public User addGroceryChangeToUser(Long userId, List<GroceryList> groceryList) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findUserByuserId(userId);
        if(user == null){
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        Set<GroceryList> user_groceries = user.getChanges();
        user_groceries.addAll(groceryList);
        user.setChanges(user_groceries);
        this.usersDAO.save(user);
        return user;
    }

    public List<Long> getDeletedGroceries(Long useId){
        List<Long> deleted = new ArrayList<>();
        return deleted;
    }




}
