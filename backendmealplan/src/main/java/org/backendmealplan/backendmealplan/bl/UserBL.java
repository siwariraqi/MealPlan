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
    FeedbackBL feedbackBL;

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

    public void changePassword(long userID, String currentPassword, String newPassword, String confirmPassword) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findByUserId(userID);
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new UNAUTHORIZEDException("Wrong current password");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new UNAUTHORIZEDException("New password and confirmation password do not match");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        this.usersDAO.save(user);
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
            if (!userInfo.getGoals().isEmpty()) {
                Set<Goal> goals = new HashSet<>();
                for (Goal goal : userInfo.getGoals()) {
                    Optional<Goal> optionalGoal = this.goalsDAO.findById(goal.getGoalId());
                    if (optionalGoal.isPresent()) {
                        Goal existingGoal = optionalGoal.get();
                        goals.add(existingGoal);
                    }
                }
                userInfo.setGoals(goals);
            }
            return this.usersInfoDAO.save(userInfo);
        } else {
            throw new userInfoNotFound();
        }
    }

    public User updateProfile(User newProfile) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findByUserId(newProfile.getUserId());
        if (user == null) {
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        if(newProfile.getEmail()!=null){
            if(isValidEmail(newProfile.getEmail())){
                user.setEmail(newProfile.getEmail());
            }
            else{
                throw new IllegalArgumentException("Invalid email format");
            }
        }
        if(newProfile.getPhoneNumber()!=null){
            if(isValidPhoneNumber(newProfile.getPhoneNumber())){
                user.setPhoneNumber(newProfile.getPhoneNumber());
            }
            else{
                throw new IllegalArgumentException("Invalid phone number");
            }
        }
        if(newProfile.getFirstName()!=null){
            if(newProfile.getFirstName().isEmpty()){
                throw new IllegalArgumentException("First name cannot be empty");
            }
            else if (newProfile.getFirstName().length() > 30) {
                throw new IllegalArgumentException("First name is too long");
            }else{
                user.setFirstName(newProfile.getFirstName());
            }
        }
        if(newProfile.getLastName()!=null){
            if(newProfile.getLastName().isEmpty()){
                throw new IllegalArgumentException("Last name cannot be empty");
            }
            else if (newProfile.getLastName().length() > 30) {
                throw new IllegalArgumentException("Last name is too long");
            }else{
                user.setLastName(newProfile.getLastName());
            }
        }
        if(newProfile.getUserInfo()!=null) {
            if (newProfile.getUserInfo().getGender() != null) {
                if (isValidGender(newProfile.getUserInfo().getGender())) {
                    user.getUserInfo().setGender(newProfile.getUserInfo().getGender());
                } else {
                    throw new IllegalArgumentException("Invalid gender");
                }
            }
            if (newProfile.getUserInfo().getBirthday() != null) {
                if (isValidBDate(newProfile.getUserInfo().getBirthday())) {
                    user.getUserInfo().setBirthday(newProfile.getUserInfo().getBirthday());
                } else {
                    throw new IllegalArgumentException("Invalid birthday");
                }
            }
        }

//        if (newProfile.getPassword() != null) {
//            throw new IllegalArgumentException("Password cannot be updated through this method.");
//        }

        this.usersDAO.save(user);
        return newProfile;

    }


    /*
   It checks that the email address has a local part and a domain part separated by an "@" symbol,
   and that both parts follow specific rules. The local part can contain letters, numbers, dots,
   underscores, percent signs, plus signs, or hyphens, while the domain part can contain letters,
   numbers, dots, or hyphens, and must end with a top-level domain that consists of two or more letters.
*/
    private boolean isValidEmail(String email) {
        String regexp = "^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$";
        return email.matches(regexp);
    }
    /*
      The pattern requires the phone number to start with a plus sign (+), followed by 6 to 14 digits,
      with an optional space character between each digit. The pattern also requires that the phone
      number ends with a digit.
    */
    private boolean isValidPhoneNumber(String phoneNumber) {
        // Implement your own phone number validation logic here
        String regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$" ;
        return phoneNumber.matches(regexp);
    }

    private boolean isValidGender(String gender) {
        // Implement your own gender validation logic here
        return ( gender.equals("male") || gender.equals("female") ) ;
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
        if (user == null) {
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        Plan plan = this.planBL.getPlanById(planId);
        if (plan == null) {
            throw new UNAUTHORIZEDException("plan id doesn't Exist");
        }
        user.setPlan(plan);
        this.usersDAO.save(user);
        return user;
    }

    public void deleteAccount(String email, String password, Long userId) throws UNAUTHORIZEDException {
        User user = usersDAO.findByUserId(userId);
        if(user == null){
            throw new UNAUTHORIZEDException("User NOT FOUND");
        }
        if(!user.getEmail().equals(email)){
            throw new UNAUTHORIZEDException("Wrong Email Password combination");
        }
        if (!passwordEncoder.matches(password,  user.getPassword())) {
            throw new UNAUTHORIZEDException("Wrong Email Password combination");
        }
        else{
            UserInfo userInfo = user.getUserInfo();
            feedbackBL.deleteFeedbacksByUser(user);
            //TODO : remove grocerylist changes when ready team5 @Maha ?
            usersDAO.delete(user);
            usersInfoDAO.delete(userInfo);

        }
    }

    public void resetAccount(String email, String password, Long userId) throws UNAUTHORIZEDException {
        User user = usersDAO.findByUserId(userId);
        if(user == null){
            throw new UNAUTHORIZEDException("User NOT FOUND");
        }
        if(!user.getEmail().equals(email)){
            throw new UNAUTHORIZEDException("Wrong Email Password combination");
        }
        if (!passwordEncoder.matches(password,  user.getPassword())) {
            throw new UNAUTHORIZEDException("Wrong Email Password combination");
        }
        else{
            feedbackBL.deleteFeedbacksByUser(user);
            //TODO : remove grocerylist changes when ready team5 @Maha ?

        }
    }



    public User getUser(Long userid) throws userNotFoundException {

        User user = this.usersDAO.findByUserId(userid);
        if (user != null) {
            return user;
        } else {
            throw new userNotFoundException("User not found");
        }
    }

    public User addGroceryChangeToUser(Long userId, List<GroceryList> groceryList) throws UNAUTHORIZEDException {
        User user = this.usersDAO.findByUserId(userId);
        if (user == null) {
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        Set<GroceryList> user_groceries = user.getChanges();
        user_groceries.addAll(groceryList);
        user.setChanges(user_groceries);
        return this.usersDAO.save(user);
    }

    public List<GroceryList> getDeletedGroceries(Long userId) throws UNAUTHORIZEDException {

        User user = this.usersDAO.getReferenceById(userId);
        if (user == null) {
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        return user.getChanges().stream().toList();
    }

    public Plan getUserPlan(Long userId) throws UNAUTHORIZEDException {
        User user = this.usersDAO.getReferenceById(userId);
        if (user == null) {
            throw new UNAUTHORIZEDException("user does not Exist");
        }
        return user.getPlan();
    }

}
