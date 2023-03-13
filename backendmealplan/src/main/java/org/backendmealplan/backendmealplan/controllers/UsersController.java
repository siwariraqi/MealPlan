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

  @GetMapping("/day-plan-meals/{day-number}/{user-id}")
  public ResponseEntity<List<Meal>> getDayPlanMeals(@PathVariable Integer dayNumber, @PathVariable Long userId) {
    try {
      List<Meal> meals = mealBL.getDayPlanMeals(dayNumber, userId);
      return ResponseEntity.ok(meals);
    } catch (UserNotFoundException | PaymentNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }


  @GetMapping("/day-nutrition/{day-number}/{user-id}")
  public ResponseEntity<List<Double>> getTotalDayNutrition(@PathVariable Integer dayNumber, @PathVariable Long userId) {
    try {
      List<Double> nutritions = mealBL.getTotalDayNutrition(dayNumber, userId);
      return ResponseEntity.ok(nutritions);
    } catch (UserNotFoundException | PaymentNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @GetMapping("/plan/{user-id}")
  public ResponseEntity<Plan> getPlan(@PathVariable("user-id") Long userId) {
    try {
      Plan plan = planBL.getPlan(userId);
      return ResponseEntity.ok(plan);
    } catch (UserNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
