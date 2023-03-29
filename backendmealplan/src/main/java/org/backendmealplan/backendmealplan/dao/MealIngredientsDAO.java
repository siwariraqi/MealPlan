package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.MealIngredients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface MealIngredientsDAO extends JpaRepository<MealIngredients, Long> {

  @Query(value = "SELECT * FROM mealplan.meal_ingredients join mealplan.ingredients using (ingredient_id)" +
    "where meal_id=:mealId", nativeQuery = true)
  List<MealIngredients> getMealIngredients(Long mealId);

  @Modifying
  @Query(value = "DELETE FROM mealplan.meal_ingredients WHERE meal_id=:mealId",
          nativeQuery = true,
          countQuery = "SELECT COUNT(*) FROM mealplan.meal_ingredients WHERE meal_id =:mealId")
  void deleteByMealId(Long mealId);

}
