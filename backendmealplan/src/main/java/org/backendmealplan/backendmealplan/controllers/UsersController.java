package org.backendmealplan.backendmealplan.controllers;

<<<<<<< Updated upstream
import org.backendmealplan.backendmealplan.Exceptions.PaymentNotFoundException;
import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.Goal;
=======
import org.backendmealplan.backendmealplan.Exceptions.paymentNotFoundException;
import org.backendmealplan.backendmealplan.Exceptions.userNotFoundException;
>>>>>>> Stashed changes
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.backendmealplan.backendmealplan.bl.GoalBL;
import org.backendmealplan.backendmealplan.bl.MealBL;
import org.backendmealplan.backendmealplan.bl.PlanBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.dao.PlansDAO;
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

  @GetMapping("day-plan-meals/{daynumber}/{userid}")
  public ResponseEntity<List<Meal>> getDayPlanMeals(@PathVariable Integer daynumber, @PathVariable Long userid) {
    try {
      List<Meal> meals = mealBL.getDayPlanMeals(daynumber, userid);
      return ResponseEntity.ok(meals);
    } catch (UserNotFoundException | PaymentNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } catch (paymentNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }



  @GetMapping("/day-nutrition/{daynumber}/{userid}")
  public ResponseEntity<List<String>> getTotalDayNutrition(@PathVariable Integer daynumber, @PathVariable Long userid) {
    try {

      List<String> nutritions = mealBL.getTotalDayNutrition(daynumber, userid);
      return ResponseEntity.ok(nutritions);
    } catch (UserNotFoundException | PaymentNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
  @GetMapping("plan/{userid}")
  public ResponseEntity<Plan> getPlan(@PathVariable Long userid) {
    try {
      Plan plan = planBL.getPlan(userid);
      return ResponseEntity.ok(plan);
    } catch (UserNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
