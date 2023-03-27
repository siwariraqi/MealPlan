package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.bl.FeedbackBL;
import org.backendmealplan.backendmealplan.bl.MealBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.*;
import org.backendmealplan.backendmealplan.security.AuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserBL userBL;

    @Autowired
    private MealBL mealBL;

    @Autowired
    private FeedbackBL feedbackBL;

    @GetMapping("/getall")
    public ResponseEntity<List<User>> getAll() {
        try {
            List<User> users = userBL.getAll();
            for (User user : users) {
                user.setPassword(null);
            }
            return ResponseEntity.ok(users);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@RequestParam Long userId) {
        try {
            userBL.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/reset")
    public ResponseEntity resetUser(@RequestParam Long userId) {
        try {
            userBL.resetUser(userId);
            return ResponseEntity.ok().build();
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateUserPlan(@RequestParam Long userId, @RequestParam String planName) {
        try {
            User user = userBL.updateUserPlan(userId, planName);
            return (ResponseEntity) ResponseEntity.ok(user);
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (PlanNotExistedException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/changeRole")
    public ResponseEntity UpdateUserRole(@RequestParam Long userId, @RequestParam Boolean isAdmin) {
        try {
            userBL.updateUserRole(userId, isAdmin);
            return ResponseEntity.ok().build();
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

  @GetMapping("/getFeedbacks")
  public ResponseEntity <List<UserFeedback>> getAllFeedbacks() {
    try {
      List<UserFeedback> feedbacks = feedbackBL.getAllFeedbacks();
      return ResponseEntity.ok(feedbacks);
    } catch (FeedbackNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @GetMapping("/getMeals")
  public ResponseEntity <List<Meal>> getAllMeals() {
    try {
      List<Meal> meals = mealBL.getAllMeals();
      return  ResponseEntity.ok(meals);
    } catch (MealNotFoundException e) {
      return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

//    @Autowired
//    private AuthenticationFilter authenticationFilter;
//
//    public void configure(HttpSecurity http) throws Exception {
//        http.addFilterBefore(authenticationFilter, BasicAuthenticationFilter.class)
//                .authorizeRequests()
//                .antMatchers("/admin/**").hasRole("Admin")
//                .anyRequest().permitAll()
//                .and().httpBasic()
//                .and().csrf().disable();
//    }
}
