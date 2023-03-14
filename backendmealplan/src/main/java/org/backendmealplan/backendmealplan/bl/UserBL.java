package org.backendmealplan.backendmealplan.bl;
import org.backendmealplan.backendmealplan.exceptions.UNAUTHORIZEDException;
import org.backendmealplan.backendmealplan.exceptions.userExistException;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.backendmealplan.backendmealplan.dao.GoalsDAO;
import org.backendmealplan.backendmealplan.dao.UsersInfoDAO;
import org.backendmealplan.backendmealplan.exceptions.userInfoNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserBL {
    @Autowired
    UsersDAO usersDAO;
    
    @Autowired
    UsersInfoDAO usersInfoDAO;

    @Autowired
    GoalsDAO goalsDAO;
    
    public User authentication(String email, String password) throws Exception {
        User u=usersDAO.findUserByEmailAndPassword(email,password);
        if(u==null)throw new UNAUTHORIZEDException("wrong email or password");
        return u;
    }
    public User adduser(User user)throws userExistException  {
        User u=usersDAO.findByEmail(user.getEmail());
        if(u!=null){
            throw new userExistException("user alredy Exist");
        }
        return usersDAO.save(user);
}
    /*
    Goal: creating a new userInfo and adding it to the database - table:UserInfo.
    input: UserInfo object that contains some info (probably goals), no Id yet!.
    output: UserInfo object with Id (according to the database) plus some info (that was given in the input).
    */
    public UserInfo addUserInfoGoals(UserInfo userInfo){
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
        if(existingUsersInfo.isPresent()){
            return this.usersInfoDAO.save(userInfo);
        }
        else{
            throw new userInfoNotFound();
        }
    }
}