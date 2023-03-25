package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.*;

import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("users")
@CrossOrigin
public class UsersController {
    @Autowired
    private UserBL userBL;

    @PostMapping("addUserInfo")
    public ResponseEntity addUserInfo(@Valid @RequestBody UserInfo userInfo){
        userInfo.setInfoId(null); // set infoId to null to ensure client cannot set it
        UserInfo updatedUserInfo =  userBL.addUserInfoGoals(userInfo);
        return ResponseEntity.ok(updatedUserInfo);
    }

    @PutMapping("updateUserInfo")
    public ResponseEntity updateUserInfo(@Valid @RequestBody UserInfo userInfo){
        UserInfo updatedUserInfo = null;
        try {
            if(userInfo != null){
                long userInfoId = userInfo.getInfoId();
                updatedUserInfo = userBL.updateUserInfo(userInfoId, userInfo);
            }

        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUserInfo);
    }



    @PostMapping("/choosePlan")
    public ResponseEntity<Void> choosePlan(@RequestParam Long userId, @RequestParam Long planId) {
        try {
            User user = this.userBL.userSetPlan(userId,planId);// update the user's plan and save
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping("/updateProfile")
    public ResponseEntity updateProfile(@RequestBody User user){
        try {
            this.userBL.updateProfile(user);
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        user.setPassword(null); // remove password field
        return new ResponseEntity(user,HttpStatus.OK);
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity deleteAccount(@RequestParam String email,
                                     @RequestParam String password,
                                     @RequestParam Long userId) {
        if (email == null || password==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try {
            this.userBL.deleteAccount(email, password, userId);
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resetAccount")
    public ResponseEntity resetAccount(@RequestParam String email,
                                     @RequestParam String password,
                                     @RequestParam Long userId) {
        if (email == null || password==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try {
            this.userBL.resetAccount(email, password, userId);
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }


    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            this.userBL.changePassword(request.getUserId(),request.getCurrentPassword(),request.getNewPassword(),request.getConfirmPassword());
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }


    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam long userId) {
        try {
            User user = userBL.getUser(userId);
            user.setPassword(null); // remove password field
            return ResponseEntity.ok(user);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user){
        try{
            User u =userBL.authentication(user.getEmail(),user.getPassword());
            u.setPassword(null);
            return new ResponseEntity(u,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.UNAUTHORIZED);
        }
    }

    @Transactional
    @PostMapping("/adduser")
    public ResponseEntity adduser(@Valid @RequestBody User user){
        user.setUserId(null); // set userId to null to ensure client cannot set it
        try{
            User u= userBL.adduser(user);
            return new ResponseEntity(u,HttpStatus.OK);
        }catch(userExistException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        } catch (InvalidUserException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

  @GetMapping("/getall")
  public ResponseEntity <List<User>> getAll() {
    try {
      List<User> users = userBL.getAll();
      for(User user: users) {
        user.setPassword(null);
      }
      return ResponseEntity.ok(users);
    } catch (userNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
