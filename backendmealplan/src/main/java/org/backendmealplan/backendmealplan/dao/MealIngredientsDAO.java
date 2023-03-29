package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.MealIngredients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MealIngredientsDAO extends JpaRepository<MealIngredients, Long> {
//    boolean existsByMealIdAndIngredientId(Long mealId,Long ingredientId);

  @Query(value = "SELECT * FROM mealplan.meal_ingredients join mealplan.ingredients using (ingredient_id)" +
    "where meal_id=:mealId", nativeQuery = true)
  List<MealIngredients> getMealIngredients(Long mealId);
}
