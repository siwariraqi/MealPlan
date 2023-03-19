package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.GroceryList;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.backendmealplan.backendmealplan.dao.GoalsDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.dao.UsersInfoDAO;
import org.backendmealplan.backendmealplan.exceptions.*;
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

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

    @Transactional
    public User adduser(User user) throws userExistException, InvalidUserException {
        // Validate input parameters
        if (!isValidPassword(user.getPassword())) {
            throw new InvalidUserException("Password must include at least 8 characters, letter, number, cannot include: ./=_-()");
        }

        // Check if user with email already exists
        if (usersDAO.findByEmail(user.getEmail()) != null) {
            throw new userExistException("Email already in use!");
        }

        // Hash the password
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        // Save the user to the database
        try {
            return usersDAO.save(user);
        } catch (DataAccessException e) {
            throw new InvalidUserException("Failed to save user: " + e.getMessage());
        }
    }

    private boolean isValidPassword(String password) {
        // Password must include at least 8 characters, letter, number, cannot include: ./=_-()
        return password.matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    }
    /*
    Goal: creating a new userInfo and adding it to the database - table:UserInfo.
    input: UserInfo object that contains some info (probably goals), no Id yet!.
    output: UserInfo object with Id (according to the database) plus some info (that was given in the input).
    */

    public UserInfo addUserInfoGoals(UserInfo userInfo) {
        UserInfo added = this.usersInfoDAO.save(userInfo);
        Set<Goal> goals = new HashSet<>();
        for (Goal goal : userInfo.getGoals()) {
            Optional<Goal> optionalGoal = this.goalsDAO.findById(goal.getGoalId());
            if (optionalGoal.isPresent()) {
                Goal existingGoal = optionalGoal.get();
                goals.add(existingGoal);
            }
        }
        userInfo.setGoals(goals);
        return this.usersInfoDAO.save(userInfo);
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

    public User updateProfile(User newProfile) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findByUserId(newProfile.getUserId());
        if(user == null){
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        if(!validateUser(newProfile)) {
            throw new IllegalArgumentException("Invalid User Input ");
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

    public boolean validateUser(User user) throws IllegalArgumentException {
        boolean flag = true ;
        if (user.getFirstName() == null || user.getFirstName().isEmpty() ) {
            throw new IllegalArgumentException("First name cannot be empty");
        }
        if ( user.getFirstName().length() > 30 ) {
            throw new IllegalArgumentException("FirstName is too long");
        }
        if (user.getLastName() == null || user.getLastName().isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        if ( user.getLastName().length() > 30 ) {
            throw new IllegalArgumentException("LastName is too long");
        }
        if (user.getEmail() == null || !isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email address");
        }
        if (user.getPhoneNumber() == null || !isValidPhoneNumber(user.getPhoneNumber())) {
            throw new IllegalArgumentException("Invalid phone number");
        }
        if (user.getUserInfo() != null) {
            if (user.getUserInfo().getGender() == null || !isValidGender(user.getUserInfo().getGender())) {
                throw new IllegalArgumentException("Invalid gender");
            }
            if (user.getUserInfo().getBirthday() == null || !isValidBDate(user.getUserInfo().getBirthday())) {
                throw new IllegalArgumentException("Invalid birthday");
            }
        }
        return flag ;
    }

    private boolean isValidEmail(String email) {
        // Implement your own email validation logic here

        String regexp = "/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$/";
        if(!email.matches(regexp)){
            throw new IllegalArgumentException("Invalid Input Exception -  Email");
        }
        return true ;

    }

    private boolean isValidPhoneNumber(String phoneNumber) throws IllegalArgumentException {
        // Implement your own phone number validation logic here
        String regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$" ;
        if(!phoneNumber.matches(regexp)){
            throw new IllegalArgumentException("Invalid Input Exception - phone number format");
        }
                return true ;
    }

    private boolean isValidGender(String gender) throws IllegalArgumentException {
        // Implement your own gender validation logic here
        if( !gender.equals("Male") && !gender.equals("Female")){
            throw new IllegalArgumentException("Invalid Input Exception - Gender"); // throw an exception
        }
        return true ;
    }

    // min age - 18
    // max age - 120
    private boolean isValidBDate(LocalDate date) {

            LocalDate today = LocalDate.now();
            LocalDate eighteenYearsAgo = today.minusYears(18);
            LocalDate oneHundredYearsAgo = today.minusYears(120);

            // Check if the date is at least 18 years ago and not more than 100 years ago
            return (date.isBefore(eighteenYearsAgo) || date.isEqual(eighteenYearsAgo))
                    && (date.isAfter(oneHundredYearsAgo) || date.isEqual(oneHundredYearsAgo));

    }

    public User userSetPlan( Long userId,  Long planId) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findByUserId(userId);
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

        User user = this.usersDAO.findByUserId(userid);
        if (user!=null) {
            return user;
        } else {
            throw new userNotFoundException("User not found");
        }
    }


    public User addGroceryChangeToUser(Long userId, List<GroceryList> groceryList) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findByUserId(userId);
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
