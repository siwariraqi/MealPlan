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
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public UserInfo updateUserInfo(UserInfo userInfo) throws userInfoNotFound {
        this.usersInfoDAO.save(userInfo);
//        UserInfo existingUsersInfo = this.usersInfoDAO.findById(userInfoId);
        if (userInfo != null) {
            return userInfo;
        } else {
            throw new userInfoNotFound();
        }
    }

    public User updateProfile(User newProfile) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findUserByuserId(newProfile.getUserId());
        if(user == null){
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        user.setEmail(newProfile.getEmail());
        user.setPhoneNumber(newProfile.getPhoneNumber());
        user.setFirstName(newProfile.getFirstName());
        user.setLastName(newProfile.getLastName());
        user.getUserInfo().setGender(newProfile.getUserInfo().getGender());
        user.getUserInfo().setBirthday(newProfile.getUserInfo().getBirthday());
        this.usersDAO.save(user);
        return newProfile;
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


    public User getUser(Long userid) throws userNotFoundException {

        User user = this.usersDAO.findUserByuserId(userid);
        if (user!=null) {
            return user;
        } else {
            throw new userNotFoundException("User not found");
        }
    }


    public User addGroceryChangeToUser(Long userId, List<GroceryList> groceryList) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findUserByuserId(userId);
        if(user == null){
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        Set<GroceryList> user_groceries = user.getChanges();
        user_groceries.addAll(groceryList);
        user.setChanges(user_groceries);
        return this.usersDAO.save(user);
    }

    public List<GroceryList> getDeletedGroceries(Long userId) throws UNAUTHORIZEDException {

        User user = this.usersDAO.getReferenceById(userId);
        if(user == null){
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        return user.getChanges().stream().toList();
    }

    public Plan getUserPlan(Long userId) throws UNAUTHORIZEDException {
        User user = this.usersDAO.getReferenceById(userId);
        if(user == null){
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        return user.getPlan();
    }
}

