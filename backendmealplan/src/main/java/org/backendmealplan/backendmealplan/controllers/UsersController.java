package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.bl.GoalBL;
import org.backendmealplan.backendmealplan.bl.PlanBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.paymentNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.userExistException;
import org.backendmealplan.backendmealplan.exceptions.userInfoNotFound;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.backendmealplan.backendmealplan.bl.MealBL;
import org.backendmealplan.backendmealplan.bl.PlanBL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@CrossOrigin
public class UsersController {

    @Autowired
    private MealBL mealBL;
    @Autowired
    private PlanBL planBL;
    @Autowired
    private UserBL userBL;
    @Autowired
    private GoalBL goalBL;
    
    @GetMapping("allGoals")
    public List<Goal> getAllGoals(){
        return this.goalBL.getAllGoals();
    }

    @PostMapping("addUserInfo")
    public ResponseEntity addUserInfo(@RequestBody UserInfo userInfo){
        UserInfo updatedUserInfo =  userBL.addUserInfoGoals(userInfo);
        return ResponseEntity.ok(updatedUserInfo);
    }

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



    @PostMapping("/choosePlan")
    public ResponseEntity<String> choosePlan(@RequestParam Long userId, @RequestParam Long planId) {
        try {
            User user = this.userBL.userSetPlan(userId,planId);// update the user's plan and save
        } catch (userExistException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Plan updated successfully.");
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestHeader String email,@RequestHeader String password){
        try{
            User u =userBL.authentication(email,password);
            u.setPassword(null);
            return new ResponseEntity(u,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/adduser")
    public ResponseEntity adduser(@RequestBody User user){
        try{
            User u= userBL.adduser(user);
            u.setPassword(null);
            return new ResponseEntity(u,HttpStatus.OK);
        }catch(userExistException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    
    @GetMapping("day-plan-meals/{daynumber}/{userid}")
    public ResponseEntity<List<Meal>> getDayPlanMeals(@PathVariable Integer daynumber, @PathVariable Long userid) {
        try {
            List<Meal> meals = mealBL.getDayPlanMeals(daynumber, userid);
            return ResponseEntity.ok(meals);
        } catch (userNotFoundException | paymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/day-nutrition/{daynumber}/{userid}")
    public ResponseEntity<List<String>> getTotalDayNutrition(@PathVariable Integer daynumber, @PathVariable Long userid) {
        try {

            List<String> nutritions = mealBL.getTotalDayNutrition(daynumber, userid);
            return ResponseEntity.ok(nutritions);
        } catch (userNotFoundException | paymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("plan/{userid}")
    public ResponseEntity<Plan> getPlan(@PathVariable Long userid) {
        try {
            Plan plan = planBL.getPlan(userid);
            return ResponseEntity.ok(plan);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}