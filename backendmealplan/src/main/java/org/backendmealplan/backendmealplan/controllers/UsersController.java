package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.Goal;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.backendmealplan.backendmealplan.bl.GoalBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.userInfoNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequestMapping("users")
@RestController
@CrossOrigin
public class UsersController {
    //The class not tested yet

    @Autowired
    private UserBL userBL;

    @Autowired
    private GoalBL goalBL;

    @GetMapping("allGoals")
    public Set<String> getAllGoals(){
        Set<String> goalsText = new HashSet<String>();
        List<Goal> goals = this.goalBL.getAllGoals();
        for (int i =0 ; i<goals.size();i++ )
        {
            goalsText.add(goals.get(i).getText());
        }
        return goalsText;
    }

    //TODO: not tested yet
    @PostMapping("addUserInfo")
    public ResponseEntity addUserInfo(Collection<String> txt){
        List<Goal> goals = goalBL.getalltexts(txt);
        Set<Goal> set = new HashSet<>(goals);
        UserInfo userInfo = new UserInfo();
        userInfo.setGoals(set);
        UserInfo updatedUserInfo =  userBL.addUserInfoGoals(userInfo);
        return ResponseEntity.ok(updatedUserInfo);
    }

    //TODO: not tested yet

    @PutMapping("updateUserInfo")
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
