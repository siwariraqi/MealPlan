package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.Goal;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.backendmealplan.backendmealplan.bl.GoalBL;
import org.backendmealplan.backendmealplan.bl.PlanBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.userInfoNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("users")
@RestController
@CrossOrigin
public class UsersController {
    //The class not tested yet
    @Autowired
    private UserBL userBL;

    @Autowired
    private GoalBL goalBL;
    @Autowired
    private PlanBL planBL;
    
    @GetMapping("allGoals")
    public List<Goal> getAllGoals(){
        return this.goalBL.getAllGoals();
    }

    @PostMapping("addUserInfo")
    public ResponseEntity addUserInfo(@RequestBody UserInfo userInfo){
        UserInfo updatedUserInfo =  userBL.addUserInfoGoals(userInfo);
        return ResponseEntity.ok(updatedUserInfo);
    }

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

    @PostMapping("/add")
    public ResponseEntity addUser(@RequestBody User user){
        User newUser = this.userBL.addUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/choosePlan")
    public ResponseEntity<String> choosePlan(@RequestParam Long userId, @RequestParam Long planId) {
        User user = this.userBL.userSetPlan(userId,planId);// update the user's plan and save
        return ResponseEntity.ok("Plan updated successfully.");
    }







}
