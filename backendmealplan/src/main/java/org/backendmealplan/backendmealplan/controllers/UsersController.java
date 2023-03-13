package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.Excptions.userExistException;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("Users")
public class UsersController {


    @Autowired
    UserBL userbl;
    @PostMapping("/login")
    public ResponseEntity login(@RequestHeader String email,@RequestHeader String password){
        try{
            User u =userbl.authentication(email,password);
            u.setPassword(null);
            return new ResponseEntity(u,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/adduser")
    public ResponseEntity adduser(@RequestBody User user){
        try{
            User u= userbl.adduser(user);
            u.setPassword(null);
            return new ResponseEntity(u,HttpStatus.OK);
        }catch(userExistException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }


    }



}
