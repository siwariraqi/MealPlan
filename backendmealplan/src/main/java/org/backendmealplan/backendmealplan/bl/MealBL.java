package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.Ingredient;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.MealIngredients;
import org.backendmealplan.backendmealplan.dao.DayMealsDAO;
import org.backendmealplan.backendmealplan.dao.MealIngredientsDAO;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class MealBL {

    @Autowired
    MealsDAO mealsDAO;
    @Autowired
    MealIngredientsDAO mealIngredientsDAO;

    @Autowired
    DayMealsDAO dayMealsDAO;

    public Meal addMeal(Meal meal) {
        //check if meal exists
        List<Meal> meals = this.mealsDAO.findByMealName(meal.getMealName());
        if (meals.isEmpty()) {
            this.mealsDAO.save(meal);
        }
        return meal;
    }

    public void addMealIngredients(MealIngredients mealIngredients) {
            this.mealIngredientsDAO.save(mealIngredients);
    }

    public void addDayMeals(DayMeal dayMeal){
        this.dayMealsDAO.save(dayMeal);
    }
}
