package org.backendmealplan.backendmealplan.controllers;


import org.backendmealplan.backendmealplan.Exceptions.PaymentNotFoundException;
import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.Plan;
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

  @GetMapping(name = "dayplanmeals/{daynumber}/{userid}")
  public ResponseEntity<List<Meal>> getDayPlanMeals(@PathVariable Integer daynumber, @PathVariable Long userid ){

    try {
      List<Meal> meals = this.mealBL.getDayPlanMeals(daynumber,userid);
      return ResponseEntity.ok(meals);
    } catch (UserNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } catch (PaymentNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

//  @GetMapping(name = "plan/{userid}")
//  public ResponseEntity<Plan> getPlan(@PathVariable Long userid ){
//
//    try {
//      Plan plans = this.planBL.getPlan(userid);
//      return ResponseEntity.ok(plans);
//    } catch (UserNotFoundException e) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }
//  }
//  @GetMapping(name="daynutrition/{daynumber}/{userid}")
//  public ResponseEntity getTotalDayNutrition(@PathVariable Integer daynumber,@PathVariable Long userid){
//    try {
//      List<Double> nutritions = this.mealBL.getTotalDayNutrition(daynumber, userid);
//    return ResponseEntity.ok(nutritions);
//    }catch (UserNotFoundException e) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }catch (PaymentNotFoundException e) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }
//
//  }



}
