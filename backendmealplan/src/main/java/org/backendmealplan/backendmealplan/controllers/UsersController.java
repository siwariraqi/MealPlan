package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.bl.*;
import org.backendmealplan.backendmealplan.exceptions.*;

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
            updatedUserInfo = userBL.updateUserInfo(userInfo);
        } catch (userInfoNotFound e) {
            return (ResponseEntity) ResponseEntity.notFound();
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
        return new ResponseEntity(user,HttpStatus.OK);
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam long userId) {
        try {
            User user = userBL.getUser(userId);
            return ResponseEntity.ok(user);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

//    @PostMapping("/change-password")
//    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
//        return ResponseEntity.ok(null);
//    }


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

    @PostMapping("/adduser")
    public ResponseEntity adduser(@RequestBody User user){
        try{
            User u= userBL.adduser(user);
//            u.setPassword(null);
            return new ResponseEntity(u,HttpStatus.OK);
        }catch(userExistException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("day-plan-meals/{daynumber}/{userid}")
    public ResponseEntity<List<DayMeal>> getDayPlanMeals(@PathVariable Integer daynumber, @PathVariable Long userid) {
        try {
            List<DayMeal> meals = mealBL.getDayPlanMeals(daynumber, userid);
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