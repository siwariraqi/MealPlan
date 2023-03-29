package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.MealIngredients;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.bl.MealBL;
import org.backendmealplan.backendmealplan.bl.PlanBL;
import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.paymentNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("plans")
@CrossOrigin
public class PlanController {
    @Autowired
    PlanBL planBL;
    @Autowired
    MealBL mealBL;

    @PostMapping("/add")
    public ResponseEntity addPlan(@RequestBody Plan plan){
        Plan newPlan = this.planBL.addPlan(plan);
        return ResponseEntity.ok(newPlan);
    }


    @GetMapping("day-plan-meals/{dayNumber}")
    public ResponseEntity<List<DayMeal>> getDayPlanMeals(@PathVariable Integer dayNumber, @RequestParam Long loggedInUserId) {
        try {
            List<DayMeal> meals = mealBL.getDayPlanMeals(dayNumber, loggedInUserId);
            return ResponseEntity.ok(meals);
        } catch (userNotFoundException | paymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/day-nutrition/{dayNumber}")
    public ResponseEntity<List<String>> getTotalDayNutrition(@PathVariable Integer dayNumber, @RequestParam Long loggedInUserId) {
        try {
            List<String> nutritions = mealBL.getTotalDayNutrition(dayNumber, loggedInUserId);
            return ResponseEntity.ok(nutritions);
        } catch (userNotFoundException | paymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("")
    public ResponseEntity<Plan> getPlan(@RequestParam Long loggedInUserId) {
        try {
            Plan plan = planBL.getPlan(loggedInUserId);
            return ResponseEntity.ok(plan);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/getPlans")
    public List<Plan> getPlans(){
        return  this.planBL.getAllPlans();
    }

    @GetMapping("/ingredients/{mealId}")
    public ResponseEntity <List<MealIngredients>> getDayPlanMealIngredients(@PathVariable Long mealId){
      try{
        List<MealIngredients>  Ingredients=this.mealBL.getDayPlanMealIngredients(mealId);
        return ResponseEntity.ok(Ingredients);
      }
      catch (MealNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

    }
}
