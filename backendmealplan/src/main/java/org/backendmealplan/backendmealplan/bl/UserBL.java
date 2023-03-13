package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.Excptions.UNAUTHORIZEDException;
import org.backendmealplan.backendmealplan.Excptions.userExistException;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserBL {
    @Autowired
    UsersDAO usersdao;
    public User authentication(String email, String password) throws Exception {
        User u=usersdao.findUserByEmailAndPassword(email,password);
        if(u==null)throw new UNAUTHORIZEDException("wrong email or password");
        return u;
    }
    public User adduser(User user)throws userExistException  {
        User u=usersdao.findByEmail(user.getEmail());
        if(u!=null){
            throw new userExistException("user alredy Exist");
        }
        return usersdao.save(user);
    }
}
