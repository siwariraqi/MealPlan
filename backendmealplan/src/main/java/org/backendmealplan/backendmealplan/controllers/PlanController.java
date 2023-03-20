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


    @GetMapping("day-plan-meals/{dayNumber}/{userId}")
    public ResponseEntity<List<DayMeal>> getDayPlanMeals(@PathVariable Integer dayNumber, @PathVariable Long userId) {
        try {
            List<DayMeal> meals = mealBL.getDayPlanMeals(dayNumber, userId);
            return ResponseEntity.ok(meals);
        } catch (userNotFoundException | paymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/day-nutrition/{dayNumber}/{userId}")
    public ResponseEntity<List<String>> getTotalDayNutrition(@PathVariable Integer dayNumber, @PathVariable Long userId) {
        try {
            List<String> nutritions = mealBL.getTotalDayNutrition(dayNumber, userId);
            return ResponseEntity.ok(nutritions);
        } catch (userNotFoundException | paymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("{userId}")
    public ResponseEntity<Plan> getPlan(@PathVariable Long userId) {
        try {
            Plan plan = planBL.getPlan(userId);
            return ResponseEntity.ok(plan);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/getPlans")
    public List<Plan> getPlans(){
        return  this.planBL.getAllPlans();
    }

    @GetMapping("/ingredients/{dayNumber}/{userId}")
    public ResponseEntity <List<List<MealIngredients>>> getDayPlanMealIngredients(@PathVariable Integer dayNumber, @PathVariable Long userId ){
      try{
        List<List<MealIngredients>>  Ingredients=this.mealBL.getDayPlanMealIngredients(dayNumber,userId);
        return ResponseEntity.ok(Ingredients);
      }
      catch (MealNotFoundException | userNotFoundException | paymentNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

    }
}
