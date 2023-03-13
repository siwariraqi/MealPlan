package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.Goal;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.backendmealplan.backendmealplan.bl.GoalBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.userInfoNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("users")
@RestController
@CrossOrigin
public class UsersController{
    @Autowired
    private UserBL userBL;

    @Autowired
    private GoalBL goalBL;

    //TODO: not tested yet
    @GetMapping("allGoals")
    public List<Goal> getAllGoals(){
        return this.goalBL.getAllGoals();
    }

    //TODO: not tested yet
    @PostMapping("addUserInfo")
    public ResponseEntity addUserInfo(@RequestBody UserInfo userInfo){
        UserInfo updatedUserInfo =  userBL.addUserInfoGoals(userInfo);
        return ResponseEntity.ok(updatedUserInfo);
    }

    //TODO: not tested yet
    @PostMapping("updateUserInfo")
    public ResponseEntity updateUserInfo(@RequestBody UserInfo userInfo){
        UserInfo updatedUserInfo = null;
        try {
            updatedUserInfo = userBL.updateUserInfo(userInfo.getInfoId(), userInfo);
        } catch (userInfoNotFound e) {
            return (ResponseEntity) ResponseEntity.notFound();
        }
        return ResponseEntity.ok(updatedUserInfo);
    }





}
