package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.bl.MealBL;
import org.backendmealplan.backendmealplan.enums.DietTypes;
import org.backendmealplan.backendmealplan.enums.MealTime;
import org.backendmealplan.backendmealplan.exceptions.FeedbackNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("meals")
@CrossOrigin
public class MealsController{

    @Autowired
    MealBL mealBL;

    @GetMapping("/meal-times")
    public MealTime[] getMealTimes() {
        return MealTime.values();
    }

    @GetMapping("/diet-types")
    public DietTypes[] getDietTypes() {
        return DietTypes.values();
    }

    @GetMapping("/{mealTime}/{userId}")
    public ResponseEntity getMealsByMealTime(@PathVariable String mealTime, @PathVariable Long userId) {
        try {
            List<DayMeal> meals = mealBL.getMealsByTime(mealTime, userId);
            return new ResponseEntity(meals,HttpStatus.OK);
        } catch (userNotFoundException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


  @GetMapping("/getall")
  public ResponseEntity <List<Meal>> getAllMeals() {
    try {
      List<Meal> meals = mealBL.getAllMeals();
      return  ResponseEntity.ok(meals);
    } catch (MealNotFoundException e) {
      return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }



}
