package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.bl.MealBL;
import org.backendmealplan.backendmealplan.enums.DietTypes;
import org.backendmealplan.backendmealplan.enums.MealTime;
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
    public String[] getDietTypes() {
        DietTypes[] dietTypes = DietTypes.values();
        String[] dietTypeValues = new String[dietTypes.length];
        for (int i = 0; i < dietTypes.length; i++) {
            dietTypeValues[i] = dietTypes[i].getValue();
        }
        return dietTypeValues;
    }

    @GetMapping("/{mealTime}")
    public ResponseEntity getMealsByMealTime(@PathVariable String mealTime, @RequestParam Long userId) {
        try {
            List<DayMeal> meals = mealBL.getMealsByTime(mealTime, userId);
            return new ResponseEntity(meals,HttpStatus.OK);
        } catch (userNotFoundException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


//    @PostMapping("")
//    public ResponseEntity createMeal(@Valid @RequestBody Meal meal){
//        try {
//            Meal returnedMeal = this.mealBL.addMeal(meal);
//            for(Ingredient mealIngredients: meal.getMealIngredients())
//                this.mealBL.addMealIngredients(mealIngredients);
//            return new ResponseEntity(returnedMeal,HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
//        }
//    }


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
